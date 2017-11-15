import SubredditPage from './SubredditPage';

const ITEM_FETCH_COUNT = 25;

export default class SubredditPresenter {

  private view: SubredditPage;

  constructor(private readonly subreddit: string) { }

  public bind(view: SubredditPage) {
    this.view = view;
    view.title = 'Reddit - ' + this.subreddit;
    view.onRequestItems(() => this.provideItems(ITEM_FETCH_COUNT));
    this.provideItems(ITEM_FETCH_COUNT);
  }

  private async provideItems(count: number) {
    this.view.addItems(await this.loadItems(count));
  }

  private async loadItems(count: number): Promise<RedditPost[]> {
    let response = await fetch(this.createRequestUrl(count));
    let json = await response.json() as RedditJsonResponse;
    return json.data.children;
  }

  private createRequestUrl(count: number) {
    let url = 'http://www.reddit.com/r/' + this.subreddit + '.json?' + 'limit=' + count;
    if (this.view.items.length > 0) {
      let lastItem = this.view.items[this.view.items.length - 1];
      let lastId = lastItem.kind + '_' + lastItem.data.id;
      url += '&after=' + lastId;
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
