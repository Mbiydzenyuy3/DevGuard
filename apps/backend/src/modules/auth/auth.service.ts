/* eslint-disable no-console */
/* eslint-disable no-undef */
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  });

  // 🟢 SIGNUP
  async signup(email: string, password: string) {
    try {
      const command = new SignUpCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
        ],
      });

      const response = await this.client.send(command);
      return {
        message: 'User registered successfully',
        userConfirmed: response.UserConfirmed,
      };
    } catch (error: unknown) {
      console.error('Signup failed:', error);
      throw new BadRequestException((error as Error).message || 'Signup failed');
    }
  }

  // 🟡 CONFIRM SIGNUP (optional if auto-confirmation is disabled)
  async confirmSignup(email: string, code: string) {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
      });

      await this.client.send(command);
      return { message: 'User confirmed successfully' };
    } catch (error: unknown) {
      console.error('Confirmation failed:', error);
      throw new BadRequestException((error as Error).message || 'Confirmation failed');
    }
  }

  // 🔵 LOGIN
  async login(email: string, password: string) {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await this.client.send(command);
      return response.AuthenticationResult;
    } catch (error) {
      console.error('Login failed:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
