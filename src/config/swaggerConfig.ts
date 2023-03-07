import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('My Word Pal')
  .setDescription('My Word Pal API description')
  .setVersion('1.1.0')
  .addTag('MWP')
  .build();

export { swaggerConfig };
