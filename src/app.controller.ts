import { Controller, Get, Version } from '@nestjs/common';

@Version('1')
@Controller('/')
export class AppController {
  @Get()
  getHello(): string {
    return 'Welcome to Edwin Constructions ERP API!';
  }
}