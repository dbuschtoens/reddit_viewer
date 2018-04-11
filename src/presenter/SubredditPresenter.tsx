import { last } from 'lodash';
import { inject, shared } from 'tabris-decorators';
import { AUTO_FETCH_COUNT, INITIAL_ITEM_COUNT, RedditPost, SubredditView } from '../common';
import Navigation from '../service/Navigation';
import RedditService from '../service/RedditService';
import RedditPostPage from '../ui/RedditPostPage';

@shared export default class SubredditPresenter {

  private _subreddit: string;

  constructor(
    @inject public readonly view: SubredditView,
    @inject private readonly navigation: Navigation,
    @inject private readonly reddit: RedditService
  ) {
    view.onItemsRequested(() => this.loadItems(AUTO_FETCH_COUNT));
    view.onItemSelected(ev => this.openDetailsPage(ev.item));
    view.viewModeToggleView.onModeChanged(() => this.updateViewMode());
    this.updateViewMode();
  }

  public set subreddit(subreddit: string) {
    this._subreddit = subreddit;
    this.view.title = '/r/' + this.subreddit;
    this.view.clear();
    this.loadItems(INITIAL_ITEM_COUNT);
  }

  public get subreddit() {
    return this._subreddit;
  }

  private async loadItems(count: number) {
    try {
      const newItems = await this.reddit.fetchItems(this.subreddit, count, last(this.view.items));
      this.view.addItems(newItems.filter(post => post.data.thumbnail !== 'default'));
    } catch (ex) {
      console.error(ex);
    }
  }

  private updateViewMode() {
    this.view.mode = this.view.viewModeToggleView.mode;
  }

  private openDetailsPage = (item: RedditPost) => {
    this.navigation.navigateTo(<RedditPostPage item={item} />);
  }

}
