import { Action, NavigationView, ui } from 'tabris';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './RedditService';

export let navigationView = new NavigationView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

let subredditPage = new SubredditPage();
let subredditPresenter = new SubredditPresenter('petpictures');
subredditPresenter.bind(subredditPage);
subredditPage.appendTo(navigationView);
