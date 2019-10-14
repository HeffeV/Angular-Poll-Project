import { PollAnswerVote } from './poll-answer-vote.model';

export class PollAnswer {
    constructor( 
        public pollAnswerID:number,
        public pollID: number, 
        public answer: string,
        public pollAnswerVotes: PollAnswerVote ){
    }
}
