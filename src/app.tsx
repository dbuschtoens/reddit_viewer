import { NavigationView, ui, AlertDialog } from 'tabris';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './RedditService';
import NetworkCheckService from './NetworkCheckService';

new NetworkCheckService().start();

export let navigationView = new NavigationView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

openSubredditPage('petpictures');

export function openSubredditPage(subreddit: string) {
  let subredditPage = new SubredditPage();
  let subredditPresenter = new SubredditPresenter(subreddit);
  subredditPresenter.bind(subredditPage);
  subredditPage.appendTo(navigationView);
}
