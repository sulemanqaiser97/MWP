export interface SoapboxRequestDto {
  category: string;
  user_token: string;
  file: {
    value: NodeJS.ReadableStream;
    options: {
      filename: string;
      contentType: string;
    };
  };
}
