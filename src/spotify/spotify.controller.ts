import {
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { STATUS_RESPONSE } from 'src/common/constants';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}
  @UseGuards(JwtAuthGuard)
  @Get('my-library')
  async getPlaylist(@Res() response, @Req() req): Promise<Response> {
    const result = await this.spotifyService.getMyLibrary(req.user.sub);
    return result.status === STATUS_RESPONSE.success
      ? response.status(HttpStatus.CREATED).json(result)
      : response.status(HttpStatus.BAD_REQUEST).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('add-song')
  async addSong(@Res() response, @Req() req): Promise<Response> {
    const result = await this.spotifyService.getMyLibrary(req.user.sub);
    return result.status === STATUS_RESPONSE.success
      ? response.status(HttpStatus.CREATED).json(result)
      : response.status(HttpStatus.BAD_REQUEST).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('remove-song')
  async removeSong(@Res() response, @Req() req): Promise<Response> {
    const result = await this.spotifyService.getMyLibrary(req.user.sub);
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
