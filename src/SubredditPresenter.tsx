import RedditPostPage from './RedditPostPage';
import RedditService from './RedditService';
import { last } from 'lodash';
import { RedditPost, AUTO_FETCH_COUNT, ViewMode } from './common';
import { Listener, Listeners, ChangeListeners } from 'tabris-decorators';
import { NavigationView, Composite } from 'tabris';

export default class SubredditPresenter {

  private readonly service: RedditService;

  constructor(
    private readonly subreddit: string,
    private readonly view: SubredditView,
    private readonly viewModeToggleView: ViewModeToggleView
  ) {
    this.service = new RedditService(this.subreddit);
    view.title = '/r/' + this.subreddit;
    view.onItemsRequested(() => this.loadItems(AUTO_FETCH_COUNT));
    view.onItemSelected(ev => this.openDetailsPage(ev.item));
    view.onAppear(() => viewModeToggleView.visible = true);
    view.onDisappear(() => viewModeToggleView.visible = false);
    viewModeToggleView.onModeChanged(() => this.updateMode());
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
    this.view.mode = this.viewModeToggleView.mode;
  }

  private openDetailsPage = (item: RedditPost) => {
    this.view.parent().append(
      <RedditPostPage item={item}/>
    );
  }

}

export abstract class SubredditView {
  public title: string;
  public mode: ViewMode;
  public abstract items: RedditPost[];
  public readonly onAppear: Listeners;
  public readonly onDisappear: Listeners;
  public abstract onItemsRequested: Listeners;
  public abstract onItemSelected: Listeners<{item: RedditPost}>;
  public abstract addItems(items: RedditPost[]): any;
  public abstract parent(): Composite;
}

export abstract class ViewModeToggleView {
  public mode: ViewMode;
  public visible: boolean;
  public onModeChanged: ChangeListeners<ViewMode>;
}
