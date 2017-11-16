export default class RedditService {

  constructor(private readonly subreddit: string) { }

  public async fetchItems(count: number, lastItem?: RedditPost): Promise<RedditPost[]> {
    let response = await fetch(this.createRequestUrl(count, lastItem));
    let json = await response.json() as RedditJsonResponse;
    return json.data.children;
  }

  private createRequestUrl(count: number, lastItem?: RedditPost) {
    let url = `http://www.reddit.com/r/${this.subreddit}.json?limit=${count}`;
    if (lastItem) {
      url += `&after=${lastItem.kind}_${lastItem.data.id}`;
    }
    return url;
  }

}

export interface RedditPost {
  kind: string;
  data: RedditPostData;
}

export interface RedditPostData {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  num_comments: number;
  author: string;
}

interface RedditJsonResponse {
  data: {
    children: RedditPost[]
  };
}
