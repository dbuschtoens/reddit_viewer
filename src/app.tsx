import { NavigationView, ui, AlertDialog } from 'tabris';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './RedditService';

export let navigationView = new NavigationView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(ui.contentView);

openSubredditPage('petpictures');
document.addEventListener('online', onConnectionStateChanged, false);

let connectionStateAlert = new AlertDialog({
  title: 'wifi connection lost',
  message: 'You have lost connection to your wifi network. Do you wish to continue browsing using mobile connection?',
  buttons: {
    ok: 'yes',
    cancel: 'no'
  }
}).on({
  closeCancel: () => navigationView.pages().dispose()
});

function openSubredditPage(subreddit: string) {
  let subredditPage = new SubredditPage();
  let subredditPresenter = new SubredditPresenter(subreddit);
  subredditPresenter.bind(subredditPage);
  subredditPage.appendTo(navigationView);
}

function onConnectionStateChanged() {
  if (navigator.connection.type === Connection.WIFI) {
    if (navigationView.pages().length === 0) {
      openSubredditPage('petpictures');
    }
  } else {
    connectionStateAlert.open();
  }
}
