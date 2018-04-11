import { Composite, NavigationView } from 'tabris';
import { inject, shared } from 'tabris-decorators';
import SubredditPresenter from './SubredditPresenter';
import { SubredditSelectorView } from '../common';
import Navigation from '../service/Navigation';

@shared export default class SubredditSelectorPresenter {

  constructor(
    @inject public readonly view: SubredditSelectorView,
    @inject private readonly navigation: Navigation,
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
    this.navigation.navigateTo(this.subredditPresenter.view);
    this.subredditPresenter.subreddit = this.view.items[this.view.selectionIndex];
  }

}
