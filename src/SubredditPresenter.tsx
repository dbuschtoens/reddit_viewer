import SubredditPage from './SubredditPage';
import RedditPostPage from './RedditPostPage';
import RedditService, { RedditPost } from './RedditService';
import { last } from 'lodash';
import GalleryAction from './GalleryAction';

export default class SubredditPresenter {

  public autoFetchCount: number = 0;
  private readonly service: RedditService;
  private readonly galleryAction: GalleryAction;

  constructor(
    private readonly view: SubredditPage,
    private readonly subreddit: string
  ) {
    this.service = new RedditService(this.subreddit);
    view.title = '/r/' + this.subreddit;
    view.onItemsRequested(() => this.loadItems(this.autoFetchCount));
    view.onItemSelected(ev => this.openDetailsPage(ev.item));
    this.galleryAction = <GalleryAction page={view}/>;
    this.galleryAction.onModeChanged(() => this.updateMode());
    this.updateMode();
  }

  public async loadItems(count: number) {
    try {
      let newItems = await this.service.fetchItems(count, last(this.view.items));
      newItems = newItems.filter(post => post.data.thumbnail !== 'default');
      this.view.addItems(newItems);
    } catch (ex) {
      // tslint:disable-next-line:no-console
      console.error(ex);
    }
  }

  private updateMode() {
    this.view.mode = this.galleryAction.mode;
  }

  private openDetailsPage = (item: RedditPost) => {
    this.view.parent().append(
      <RedditPostPage item={item}/>
    );
  }

}
