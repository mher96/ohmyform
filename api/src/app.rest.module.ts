import { Module } from '@nestjs/common'
import { controllers } from './controller'

@Module({
  controllers,
})
export class AppRestModule {}
