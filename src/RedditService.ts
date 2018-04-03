import { RedditPost, RedditJsonResponse } from './common';

export default class RedditService {

  constructor(private readonly subreddit: string) { }

  public async fetchItems(count: number, lastItem?: RedditPost): Promise<RedditPost[]> {
    const response = await fetch(this.createRequestUrl(count, lastItem));
    const json = await response.json() as RedditJsonResponse;
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
