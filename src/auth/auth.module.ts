import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { SpotifyOauthStrategy } from './strategies/spotify-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SpotifyOauthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
