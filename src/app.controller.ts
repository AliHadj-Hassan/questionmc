import { Controller, Get, Inject } from '@nestjs/common';
import {ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { QuestionPatterns, QuestionTypePatterns } from './enums/question.enums';

@Controller()
export class AppController {
  constructor(private appService: AppService,
    
    ) {}

 

}
