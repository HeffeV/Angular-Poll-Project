import { PollAnswer } from './poll-answer.model';

export class Poll {
    constructor( 
        public pollID:number,
        public name: string,
        public owner:number,
        public singleVote:boolean,
        public pollAnswers: PollAnswer[] ){
    }
}
