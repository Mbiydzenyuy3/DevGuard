// /* eslint-disable no-console */
// /* eslint-disable no-undef */
// //auth.service.ts
// import {
//   CognitoIdentityProviderClient,
//   SignUpCommand,
//   ConfirmSignUpCommand,
//   InitiateAuthCommand,
//   ForgotPasswordCommand,
//   ConfirmForgotPasswordCommand,
// } from '@aws-sdk/client-cognito-identity-provider';
// import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

// @Injectable()
// export class AuthService {
//   private client = new CognitoIdentityProviderClient({
//     region: process.env.AWS_REGION,
//   });

//   async signup(email: string, password: string) {
//     try {
//       const command = new SignUpCommand({
//         ClientId: process.env.AWS_COGNITO_CLIENT_ID,
//         Username: email,
//         Password: password,
//         UserAttributes: [
//           {
//             Name: 'email',
//             Value: email,
//           },
//         ],
//       });

//       const response = await this.client.send(command);
//       return {
//         message: 'User registered successfully',
//         userConfirmed: response.UserConfirmed,
//       };
//     } catch (error: unknown) {
//       console.error('Signup failed:', error);
//       throw new BadRequestException((error as Error).message || 'Signup failed');
//     }
//   }

//   async confirmSignup(email: string, code: string) {
//     try {
//       const command = new ConfirmSignUpCommand({
//         ClientId: process.env.AWS_COGNITO_CLIENT_ID,
//         Username: email,
//         ConfirmationCode: code,
//       });

//       await this.client.send(command);
//       return { message: 'User confirmed successfully' };
//     } catch (error: unknown) {
//       console.error('Confirmation failed:', error);
//       throw new BadRequestException((error as Error).message || 'Confirmation failed');
//     }
//   }

//   async login(email: string, password: string) {
//     try {
//       const command = new InitiateAuthCommand({
//         AuthFlow: 'USER_PASSWORD_AUTH',
//         ClientId: process.env.AWS_COGNITO_CLIENT_ID,
//         AuthParameters: {
//           USERNAME: email,
//           PASSWORD: password,
//         },
//       });

//       const response = await this.client.send(command);
//       return response.AuthenticationResult;
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw new UnauthorizedException('Invalid email or password');
//     }
//   }
//   async forgotPassword(email: string) {
//     try {
//       const command = new ForgotPasswordCommand({
//         ClientId: process.env.AWS_COGNITO_CLIENT_ID,
//         Username: email,
//       });

//       const response = await this.client.send(command);
//       return {
//         message: 'Password reset code sent to email',
//         deliveryDetails: response.CodeDeliveryDetails,
//       };
//     } catch (err: unknown) {
//       const error = err as Error;
//       throw new BadRequestException(error.message || 'Failed to send reset code');
//     }
//   }

//   // 🔄 RESET PASSWORD (CONFIRM)
//   async resetPassword(email: string, code: string, newPassword: string) {
//     try {
//       const command = new ConfirmForgotPasswordCommand({
//         ClientId: process.env.AWS_COGNITO_CLIENT_ID,
//         Username: email,
//         ConfirmationCode: code,
//         Password: newPassword,
//       });

//       await this.client.send(command);
//       return { message: 'Password has been reset successfully' };
//     } catch (err: unknown) {
//       const error = err as Error;
//       throw new BadRequestException(error.message || 'Password reset failed');
//     }
//   }
// }

/* eslint-disable no-unused-vars */
//auth/auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CognitoService } from './cognito.service';

@Injectable()
export class AuthService {
  constructor(private readonly cognito: CognitoService) {}

  async signup(email: string, password: string) {
    try {
      const resp = await this.cognito.signUp(email, password);
      return {
        message: 'User registered successfully',
        userConfirmed: (resp as any).UserConfirmed,
      };
    } catch (err: unknown) {
      const e = err as Error;
      throw new BadRequestException(e.message || 'Signup failed');
    }
  }

  async confirmSignup(email: string, code: string) {
    try {
      await this.cognito.confirmSignUp(email, code);
      return { message: 'User confirmed successfully' };
    } catch (err: unknown) {
      const e = err as Error;
      throw new BadRequestException(e.message || 'Confirmation failed');
    }
  }

  async login(email: string, password: string) {
    try {
      const resp = await this.cognito.login(email, password);
      // For convenience return AuthenticationResult or throw unauthorized
      return (resp as any).AuthenticationResult;
    } catch (err: unknown) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async forgotPassword(email: string) {
    try {
      const resp = await this.cognito.forgotPassword(email);
      return {
        message: 'Password reset code sent',
        deliveryDetails: (resp as any).CodeDeliveryDetails,
      };
    } catch (err: unknown) {
      const e = err as Error;
      throw new BadRequestException(e.message || 'Failed to send reset code');
    }
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    try {
      await this.cognito.confirmForgotPassword(email, code, newPassword);
      return { message: 'Password has been reset successfully' };
    } catch (err: unknown) {
      const e = err as Error;
      throw new BadRequestException(e.message || 'Password reset failed');
    }
  }
}
