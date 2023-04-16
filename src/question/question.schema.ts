import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'
import { QuestionDifficultyEnum, QuestionLanguageEnum, QuestionTypeEnum } from 'src/enums/question.enums';
export type QuestionDocument= Question & Document;

@Schema()
export class Question {
    @Prop()
    name:string;
    @Prop()
    tag:string;
    @Prop()
    difficulty:QuestionDifficultyEnum;
    @Prop()
    language:QuestionLanguageEnum;
    @Prop()
    type:QuestionTypeEnum;
    
}

export const QuestionSchema = SchemaFactory.createForClass(Question)