import { Controller, Get } from '@nestjs/common';

@Controller()
export class BotController {
  @Get()
  index(): string {
    return 'Hi! I am Armin, a Discord bot.';
  }
}
