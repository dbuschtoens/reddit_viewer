import SubredditPage from './SubredditPage';
import RedditPostPage from './RedditPostPage';
import RedditService, { RedditPost } from './RedditService';

export default class SubredditPresenter {

  public autoFetchCount: number = 0;
  private readonly service: RedditService;

  constructor(
    private readonly view: SubredditPage,
    private readonly subreddit: string
  ) {
    this.service = new RedditService(this.subreddit);
    view.title = '/r/' + this.subreddit;
  }

  public async loadItems(count: number) {
    try {
      let itemsLength = this.view.items.length;
      let lastItem = itemsLength ? this.view.items[itemsLength - 1] : undefined;
      let items = await this.service.fetchItems(count, lastItem);
      items = items.filter(post => post.data.thumbnail !== 'default');
      this.view.addItems(items);
    } catch (ex) {
      // tslint:disable-next-line:no-console
      console.error(ex);
    }
  }

  // private openDetailsPage = (item: RedditPost) => {
  //   this.view.parent().append(
  //     <RedditPostPage item={item}/>
  //   );
  // }

}
