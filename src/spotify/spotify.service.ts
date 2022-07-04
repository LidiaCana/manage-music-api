import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { STATUS_RESPONSE } from 'src/common/constants';
import { IError, IResponse } from 'src/common/type';

@Injectable()
export class SpotifyService {
  async getMyPlayList(): Promise<IResponse<IError>> {
    return {
      status: STATUS_RESPONSE.fail,
      data: {
        message: 'err',
      },
    };
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
}
