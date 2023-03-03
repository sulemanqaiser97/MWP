import { Module } from '@nestjs/common';
import { SoapboxController } from './soapbox.controller';
import { SoapboxService } from './soapbox.service';

@Module({
  controllers: [SoapboxController],
  providers: [SoapboxService],
})
export class SoapboxModule {}
