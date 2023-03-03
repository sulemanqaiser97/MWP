import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SoapboxRequestDto } from './dto/soapbox-request.dto';
import { SoapboxResponseDto } from './dto/soapbox-response.dto';
import { SoapboxService } from './soapbox.service';

@Controller('soapbox')
export class SoapboxController {
  constructor(private readonly soapboxService: SoapboxService) {}

  @Post('verify-sound')
  @UseInterceptors(FileInterceptor('file'))
  async verifySound(
    @UploadedFile() file,
    @Body('category') category: string,
    @Body('user_token') userToken: string,
  ): Promise<SoapboxResponseDto> {
    const request: SoapboxRequestDto = {
      category,
      user_token: userToken,
      file: {
        value: file.buffer,
        options: {
          filename: 'recording',
          contentType: 'audio/wav',
        },
      },
    };
    return this.soapboxService.verifySound(request);
  }
}
