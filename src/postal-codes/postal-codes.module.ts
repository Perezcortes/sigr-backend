import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PostalCodesController } from './postal-codes.controller';
import { PostalCodesService } from './postal-codes.service';

@Module({
  imports: [HttpModule], // Permite usar HttpService en este módulo
  controllers: [PostalCodesController],
  providers: [PostalCodesService],
  exports: [PostalCodesService],
})
export class PostalCodesModule {}
