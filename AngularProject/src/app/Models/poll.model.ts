import { PollAnswer } from './poll-answer.model';

export class Poll {
    constructor( 
        public pollID:number,
        public name: string,
        public accepted:boolean,
        public PollAnswers: PollAnswer[] ){
    }
}
