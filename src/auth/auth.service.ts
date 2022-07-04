/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { STATUS_RESPONSE } from 'src/common/constants';
import { IError, IResponse } from 'src/common/type';
import { UsersService } from 'src/users/users.service';

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user?: {
    id: string;
    name: string;
    email?: string;
    images?: any[];
  };
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async login(data: {
    code: string;
  }): Promise<IResponse<ILoginResponse | IError>> {
    let result: IResponse<ILoginResponse | IError>;
    const SpotifyWebApi = require('spotify-web-api-node');
    const spotifyApi = new SpotifyWebApi({
      redirectUri: this.configService.get('redirectUri'),
      clientId: this.configService.get('clientId'),
      clientSecret: this.configService.get('clientSecret'),
    });

    try {
      const {
        body: { access_token, refresh_token, expires_in },
      } = await spotifyApi.authorizationCodeGrant(data.code);
      spotifyApi.setAccessToken(access_token);
      const {
        body: { display_name, id, email, images },
      } = await spotifyApi.getMe();

      // TODO: Change to get from token guard
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;

      const user = await this.userService.findOne(id);
      if (!user) {
        await this.userService.create({
          name: display_name,
          spotify_id: id,
        });
      }

      const payload = {
        spotifyToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        name: display_name,
        sub: id,
      };
      result = {
        status: STATUS_RESPONSE.success,
        data: {
          accessToken: this.jwtService.sign(payload),
          refreshToken: refresh_token,
          user: { name: display_name, email: email, id, images },
          expiresIn: expires_in,
        },
      };
    } catch (err) {
      result = {
        status: STATUS_RESPONSE.fail,
        data: {
          message: err,
        },
      };
    }
    return result;
  }
}
