import { Module } from '@nestjs/common';
import { AxiosApiCallerService } from './axios-api-caller.service';

@Module({
  exports: [AxiosApiCallerService],
  providers: [AxiosApiCallerService],
})
export class AxiosApiCallerModule {}
