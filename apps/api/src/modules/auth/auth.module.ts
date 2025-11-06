// //auth.module.ts
// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { CognitoService } from './cognito.service';

// @Module({
//   controllers: [AuthController],
//   providers: [AuthService, CognitoService],
// })
// export class AuthModule {}

// apps/api/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CognitoService } from './cognito.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CognitoService],
  exports: [CognitoService],
})
export class AuthModule {}
