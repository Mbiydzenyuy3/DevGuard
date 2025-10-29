/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
  private client: CognitoIdentityProviderClient;

  constructor(private config: ConfigService) {
    this.client = new CognitoIdentityProviderClient({
      region: this.config.get('AWS_REGION'),
      logger: console,
    });
  }

  async signUp(email: string, password: string) {
    const command = new SignUpCommand({
      ClientId: this.config.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
      Password: password,
    });

    return this.client.send(command);
  }

  async signIn(email: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: this.config.get('AWS_COGNITO_AUTH_FLOW'),
      ClientId: this.config.get('AWS_COGNITO_CLIENT_ID'),
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    return this.client.send(command);
  }
}
