import { Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Request } from 'express';
import { QuestionPatterns, QuestionTypeEnum, QuestionTypePatterns } from 'src/enums/question.enums';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {

    constructor(private _questionService: QuestionService, @Inject('GATE_WAY_QUEUE') private gateWayClient: ClientProxy) { }

    // @Post()
    // createQuestion(@Req() req:Request){
    // console.log(req.body);
    // return this._questionService.create(req.body)
    // }


    /** Event Based Requests */

    // @EventPattern(QuestionTypePatterns.GET_QCU_QUESTION)
    // async getQuestion(data: Record<string, unknown>) {
    //     console.log('question mc', data)

    // }

    @EventPattern(QuestionPatterns.ADD_QUESTION)
    async addQuestion(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log('ADD_QUESTION ', data)
        return await this._questionService.create(data);
    }

    @EventPattern(QuestionPatterns.GET_QUESTION_BY_REQUIRMENTS)
    async getQuestionByRequierments(@Payload() data: any, @Ctx() context: RmqContext) {
        console.log('GET_QUESTION_BY_REQUIRMENTSs', data)
        let questionList =[]
        for(let requirment of data){
            console.log('gg',requirment)
            let fetchedQuestion= await this._questionService.fetchQuestion({type:requirment.type,tag:requirment.tag });
            questionList.push(...fetchedQuestion);
        }
        console.log(questionList);
        return await this.gateWayClient.emit(QuestionPatterns.QUESTION_REPLY, questionList)

    }


}
