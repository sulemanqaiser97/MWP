import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SoapboxRequestDto } from './dto/soapbox-request.dto';
import { SoapboxResponseDto } from './dto/soapbox-response.dto';
import { SoapboxService } from './soapbox.service';

@ApiTags('Soapbox')
@Controller('soapbox')
export class SoapboxController {
  constructor(private readonly soapboxService: SoapboxService) {}

  @Post('verify-sound')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: SoapboxRequestDto })
  async verifySound(
    @UploadedFile() file,
    @Body() requestBody: SoapboxRequestDto,
  ): Promise<SoapboxResponseDto> {
    const request: SoapboxRequestDto = {
      category: requestBody.category,
      user_token: requestBody.user_token,
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
