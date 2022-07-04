import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { STATUS_RESPONSE } from 'src/common/constants';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}
  @UseGuards(JwtAuthGuard)
  @Get('my-library')
  async getPlaylist(@Res() response): Promise<Response> {
    const result = await this.spotifyService.getMyPlayList();
    return result.status === STATUS_RESPONSE.success
      ? response.status(HttpStatus.CREATED).json(result)
      : response.status(HttpStatus.BAD_REQUEST).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('new-release')
  async getNewRelease(@Res() response): Promise<Response> {
    const result = await this.spotifyService.getNewRelease();
    return result.status === STATUS_RESPONSE.success
      ? response.status(HttpStatus.CREATED).json(result)
      : response.status(HttpStatus.BAD_REQUEST).json(result);
  }
}
