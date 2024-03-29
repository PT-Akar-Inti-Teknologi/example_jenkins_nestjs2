import { Global, Module } from '@nestjs/common';
import { ResponseService } from 'src/response/response.service';

@Global()
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
  imports: [],
})
export class ResponseModule {}
