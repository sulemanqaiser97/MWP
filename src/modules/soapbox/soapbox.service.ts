import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { SoapboxRequestDto } from './dto/soapbox-request.dto';
import { SoapboxResponseDto } from './dto/soapbox-response.dto';

@Injectable()
export class SoapboxService {
  private readonly apiUrl = 'https://api.soapboxlabs.com/v1';

  async verifySound(request: SoapboxRequestDto): Promise<SoapboxResponseDto> {
    const formData = new FormData();
    formData.append('category', request.category);
    formData.append('user_token', request.user_token);
    formData.append('file', request.file.value, {
      filename: request.file.options.filename,
      contentType: 'audio/wav',
    });

    const headers = {
      'X-App-Key': '9c0c30be-adee-11ed-9810-faa4467166ab',
    };

    const url = `${this.apiUrl}/speech/verification`;

    const response = await axios.post<SoapboxResponseDto>(url, formData, {
      headers,
    });

    return response.data;
  }
}
