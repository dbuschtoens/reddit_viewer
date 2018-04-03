import SubredditPage from './SubredditPage';
import RedditPostPage from './RedditPostPage';
import RedditService from './RedditService';
import { last } from 'lodash';
import GalleryAction from './GalleryAction';
import { RedditPost, AUTO_FETCH_COUNT } from './common';

export default class SubredditPresenter {

  private readonly service: RedditService;
  private readonly galleryAction: GalleryAction;

  constructor(
    private readonly view: SubredditPage,
    private readonly subreddit: string
  ) {
    this.service = new RedditService(this.subreddit);
    view.title = '/r/' + this.subreddit;
    view.onItemsRequested(() => this.loadItems(AUTO_FETCH_COUNT));
    view.onItemSelected(ev => this.openDetailsPage(ev.item));
    this.galleryAction = <GalleryAction page={view}/>;
    this.galleryAction.onModeChanged(() => this.updateMode());
    this.updateMode();
  }

  public async loadItems(count: number) {
    try {
      const newItems = await this.service.fetchItems(count, last(this.view.items));
      this.view.addItems(newItems.filter(post => post.data.thumbnail !== 'default'));
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
