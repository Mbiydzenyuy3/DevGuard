/* eslint-disable no-console */
/* eslint-disable no-undef */
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  });

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
  async forgotPassword(email: string) {
    try {
      const command = new ForgotPasswordCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
      });

      const response = await this.client.send(command);
      return {
        message: 'Password reset code sent to email',
        deliveryDetails: response.CodeDeliveryDetails,
      };
    } catch (err: unknown) {
      const error = err as Error;
      throw new BadRequestException(error.message || 'Failed to send reset code');
    }
  }

  // 🔄 RESET PASSWORD (CONFIRM)
  async resetPassword(email: string, code: string, newPassword: string) {
    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: process.env.AWS_COGNITO_CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
      });

      await this.client.send(command);
      return { message: 'Password has been reset successfully' };
    } catch (err: unknown) {
      const error = err as Error;
      throw new BadRequestException(error.message || 'Password reset failed');
    }
  }
}
