import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { STATUS_RESPONSE } from 'src/common/constants';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() code: { code: string },
    @Res() response,
  ): Promise<Response> {
    const result = await this.authService.login(code);
    return result.status === STATUS_RESPONSE.success
      ? response.status(HttpStatus.CREATED).json(result)
      : response.status(HttpStatus.BAD_REQUEST).json(result);
  }
}
