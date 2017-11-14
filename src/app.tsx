import { NavigationView, ui } from 'tabris';
import SubredditPage from './SubredditPage';

export let navigationView = new NavigationView({
  left:0, top: 0, right:0, bottom:0
}).append(<SubredditPage subreddit='petpictures'/>)
.appendTo(ui.contentView);

