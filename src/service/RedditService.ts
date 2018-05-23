import { shared } from 'tabris-decorators';
import { RedditJsonResponse, RedditPost } from '../common';

@shared export default class RedditService {

  public async fetchItems(subreddit: string, count: number, lastItem?: RedditPost): Promise<RedditPost[]> {
    const response = await fetch(this.createRequestUrl(subreddit, count, lastItem));
    const json = await response.json() as RedditJsonResponse;
    return json.data.children;
  }

  private createRequestUrl(subreddit: string, count: number, lastItem?: RedditPost) {
    let url = `http://www.reddit.com/r/${subreddit}.json?limit=${count}`;
    if (lastItem) {
      url += `&after=${lastItem.kind}_${lastItem.data.id}`;
    }
    return url;
  }

}
