import { ApiProperty } from '@nestjs/swagger';

export class SoapboxRequestDto {
  @ApiProperty({
    example: 'category_example',
    description: 'The category of the Soapbox request',
    type: 'string',
    required: true,
  })
  category: string;

  @ApiProperty({
    example: 'user_token_example',
    description: 'The user token associated with the Soapbox request',
    type: 'string',
    required: true,
  })
  user_token: string;

  @ApiProperty({
    type: 'object',
    required: true,
    properties: {
      value: {
        type: 'string',
        format: 'binary',
        description: 'The binary content of the file',
      },
      options: {
        type: 'object',
        properties: {
          filename: {
            type: 'string',
            example: 'example.wav',
          },
          contentType: {
            type: 'string',
            example: 'audio/wav',
          },
        },
      },
    },
  })
  file: {
    value: NodeJS.ReadableStream;
    options: {
      filename: string;
      contentType: string;
    };
  };
}
