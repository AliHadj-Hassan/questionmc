import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const local='amqp://admin:admin@localhost:5672'
  const cloud='mqps://cnbgswus:KqwjuTc8DFf2mmFGfY-uHy2JljgyEgoU@rat.rmq2.cloudamqp.com/cnbgswus'
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport:Transport.RMQ,
      options:{
      urls:[local],
      queue:'question_queue',
      noAck:true,
      queueOptions: {
        durable: false,
        
      },

  }
    },
  );
  await app.listen();
}
bootstrap();
