import { Module } from '@nestjs/common';
import { StatisticsHandler } from './statistics.handler';

@Module({
  providers: [StatisticsHandler],
  exports: [StatisticsHandler],
})
export class StatisticsModule {}
