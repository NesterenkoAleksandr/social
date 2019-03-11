export interface News {
    date: string;
    owner: {
        avatar: string;
        country: string;
        full_name: string;
        _id: string;
    };
    pictures: [{
        likes: [string];
        url: string;
        views: [string];
        _id: string;
    }];
    _id: string;
}

export interface NewsResponse {
    counts: number;
    news: Array<News>;
}
