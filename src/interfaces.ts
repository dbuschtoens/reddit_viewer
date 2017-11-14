export interface RedditItem {
    loading: boolean;
    kind?: string;
    data?: RedditData;
}

export interface RedditData {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
    num_comments: number;
    author: string;
}

export interface RedditUrlParameters {
    limit: number;
    before?: string;
    after?: string;
}
