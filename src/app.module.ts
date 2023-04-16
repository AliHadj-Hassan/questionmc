import { Module } from '@nestjs/common';
import { ClientsModule, Transport,ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionController } from './question/question.controller';
import { Question, QuestionSchema } from './question/question.schema';
import { QuestionService } from './question/question.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


const cloud='amqps://cnbgswus:KqwjuTc8DFf2mmFGfY-uHy2JljgyEgoU@rat.rmq2.cloudamqp.com/cnbgswus';
const local='amqp://admin:admin@localhost:15672'
@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/question'),
  MongooseModule.forFeature([{name:Question.name,schema:QuestionSchema}]),
 
  ConfigModule.forRoot(),
  ClientsModule.register([
    {
      name:'GATE_WAY_QUEUE',
      transport:Transport.RMQ,
      options:{
          urls:[local],
          queue:'GATE_WAY_QUEUE',
         
          queueOptions: {
            durable: false,
          },
      }
    }
  ])
],
  controllers: [AppController, QuestionController],
  providers: [AppService, QuestionService,
 
  ],
})
export class AppModule {}
