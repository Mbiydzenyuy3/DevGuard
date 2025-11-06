// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// //cognito.service.ts
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import {
//   CognitoIdentityProviderClient,
//   SignUpCommand,
//   InitiateAuthCommand,
// } from '@aws-sdk/client-cognito-identity-provider';

// @Injectable()
// export class CognitoService {
//   private client: CognitoIdentityProviderClient;

//   constructor(private config: ConfigService) {
//     this.client = new CognitoIdentityProviderClient({
//       region: this.config.get('AWS_REGION'),
//       logger: console,
//     });
//   }

//   async signUp(email: string, password: string) {
//     const command = new SignUpCommand({
//       ClientId: this.config.get('AWS_COGNITO_CLIENT_ID'),
//       Username: email,
//       Password: password,
//     });

//     return this.client.send(command);
//   }

//   async signIn(email: string, password: string) {
//     const command = new InitiateAuthCommand({
//       AuthFlow: this.config.get('AWS_COGNITO_AUTH_FLOW'),
//       ClientId: this.config.get('AWS_COGNITO_CLIENT_ID'),
//       AuthParameters: {
//         USERNAME: email,
//         PASSWORD: password,
//       },
//     });

//     return this.client.send(command);
//   }
// }

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//cognito.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  AuthFlowType,
} from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
  private readonly logger = new Logger(CognitoService.name);
  private client: CognitoIdentityProviderClient;
  private clientId: string;
  private authFlow: string;

  constructor(private readonly config: ConfigService) {
    this.client = new CognitoIdentityProviderClient({
      region: this.config.get<string>('AWS_REGION'),
      logger: console,
    });

    this.clientId = this.config.get<string>('AWS_COGNITO_CLIENT_ID')!;
    this.authFlow = this.config.get<string>('AWS_COGNITO_AUTH_FLOW') || 'USER_PASSWORD_AUTH';
  }

  async signUp(email: string, password: string) {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: 'email', Value: email }],
    });

    this.logger.debug(`Signing up user ${email}`);
    return this.client.send(command);
  }

  async confirmSignUp(email: string, code: string) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code,
    });

    return this.client.send(command);
  }

  async login(email: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: this.authFlow as AuthFlowType,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    return this.client.send(command);
  }

  async forgotPassword(email: string) {
    const command = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: email,
    });

    return this.client.send(command);
  }

  async confirmForgotPassword(email: string, code: string, newPassword: string) {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    });

    return this.client.send(command);
  }
}
