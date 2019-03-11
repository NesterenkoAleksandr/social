export interface Challenge {
    awards: number;
    background: string;
    challenge_name: string;
    end_date: string;
    is_active: boolean;
    is_closed: boolean;
    last_picture: string;
    start_date: string;
    votes: number;
    _id: string;
}

export interface ChallengesResponse {
    counts: number;
    challenges: Array<Challenge>;
}
