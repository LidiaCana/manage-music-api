import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { STATUS_RESPONSE } from 'src/common/constants';
import { IError, IResponse } from 'src/common/type';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SpotifyService {
  constructor(private userService: UsersService) {}
  async getMyLibrary(id: string): Promise<IResponse<IError | any>> {
    try {
      const user = await this.userService.findOne(id);

      return {
        status: STATUS_RESPONSE.success,
        data: user,
      };
    } catch (error) {
      return {
        status: STATUS_RESPONSE.fail,
        data: {
          message: error,
        },
      };
    }
  }
  async getNewRelease(): Promise<IResponse<IError>> {
    try {
      const { data, status } = await axios.get(
        'https://api.spotify.com/v1/browse/featured-playlists',
      );
      if (status === STATUS_RESPONSE.success) {
        return {
          status: STATUS_RESPONSE.success,
          data,
        };
      }
    } catch (error) {
      return {
        status: STATUS_RESPONSE.fail,
        data: {
          message: error,
        },
      };
    }
  }

  async addSong(
    userId: string,
    postData: CreateUserDto,
  ): Promise<IResponse<IError | any>> {
    try {
      const user = await this.userService.update(userId, postData);
      return {
        status: STATUS_RESPONSE.success,
        data: user,
      };
    } catch (error) {
      return {
        status: STATUS_RESPONSE.fail,
        data: {
          message: error,
        },
      };
    }
  }
  async removeSong(
    userId: string,
    postData: CreateUserDto,
  ): Promise<IResponse<IError | any>> {
    try {
      // TODO: Add logic to remove song
      const user = await this.userService.update(userId, postData);

      return {
        status: STATUS_RESPONSE.success,
        data: user,
      };
    } catch (error) {
      return {
        status: STATUS_RESPONSE.fail,
        data: {
          message: error,
        },
      };
    }
  }
}
