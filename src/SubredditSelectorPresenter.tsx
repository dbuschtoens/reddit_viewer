import RedditPostPage from './RedditPostPage';
import RedditService from './RedditService';
import { last } from 'lodash';
import { RedditPost, AUTO_FETCH_COUNT, ViewMode, DEFAULT_REDDITS } from './common';
import { NavigationView, Composite } from 'tabris';
import { shared, Listeners, ChangeListeners, inject, injector } from 'tabris-decorators';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './SubredditPresenter';

export abstract class SubredditSelectorView {
  public abstract items: string[];
  public abstract selectionIndex: number;
  public abstract onSelectionIndexChanged: ChangeListeners<number>;
}

@shared export default class SubredditSelectorPresenter {

  constructor(
    @inject private readonly view: SubredditSelectorView,
    @inject private readonly subredditPresenter: SubredditPresenter
  ) {
    view.onSelectionIndexChanged(() => this.updateSubreddit());
  }

  public set subreddits(subreddits: string[]) {
    this.view.items = subreddits;
    this.updateSubreddit();
  }

  public get subreddits() {
    return this.view.items;
  }

  private updateSubreddit() {
    this.subredditPresenter.subreddit = this.view.items[this.view.selectionIndex];
  }

}
