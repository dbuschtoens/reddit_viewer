import { last } from 'lodash';
import { Composite } from 'tabris';
import { ChangeListeners, inject, Listeners, shared } from 'tabris-decorators';
import { AUTO_FETCH_COUNT, INITIAL_ITEM_COUNT, RedditPost, ViewMode } from './common';
import RedditPostPage from './RedditPostPage';
import RedditService from './RedditService';

export abstract class SubredditView {
  public title: string;
  public mode: ViewMode;
  public abstract items: RedditPost[];
  public readonly onAppear: Listeners;
  public readonly onDisappear: Listeners;
  public abstract onItemsRequested: Listeners;
  public abstract onItemSelected: Listeners<{item: RedditPost}>;
  public abstract addItems(items: RedditPost[]): any;
  public abstract clear(): any;
  public abstract parent(): Composite;
}

export abstract class ViewModeToggleView {
  public mode: ViewMode;
  public visible: boolean;
  public onModeChanged: ChangeListeners<ViewMode>;
}

@shared export default class SubredditPresenter {

  private _subreddit: string;

  constructor(
    @inject private readonly view: SubredditView,
    @inject private readonly viewModeToggleView: ViewModeToggleView,
    @inject private readonly service: RedditService
  ) {
    view.onItemsRequested(() => this.loadItems(AUTO_FETCH_COUNT));
    view.onItemSelected(ev => this.openDetailsPage(ev.item));
    view.onAppear(() => viewModeToggleView.visible = true);
    view.onDisappear(() => viewModeToggleView.visible = false);
    viewModeToggleView.onModeChanged(() => this.updateMode());
    this.updateMode();
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
      const newItems = await this.service.fetchItems(this.subreddit, count, last(this.view.items));
      this.view.addItems(newItems.filter(post => post.data.thumbnail !== 'default'));
    } catch (ex) {
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
