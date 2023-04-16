import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionRequirement } from 'src/types/question-requirements.type';
import { Question, QuestionDocument } from './question.schema';

@Injectable()
export class QuestionService {
constructor(@InjectModel(Question.name) private questionModel:Model<QuestionDocument> ){

}


async create(question:any):Promise<Question>{
    const creatredQuestion= new this.questionModel(question);
    return creatredQuestion.save();
}

async fetchQuestion(requirments:QuestionRequirement){
let record =this.questionModel.find(requirments).exec();

    return record;
}
}
