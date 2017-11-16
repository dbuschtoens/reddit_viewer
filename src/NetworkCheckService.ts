import { AlertDialog } from 'tabris';
import { navigationView, openSubredditPage } from './app';

const WARNING =
`You have lost connection to your wifi network. \
Do you wish to continue browsing using a cellular connection? \
(Additional fees may apply.)`;

export default class NetworkCheckService {

  private connectionStateAlert: AlertDialog;

  public start() {
    document.addEventListener('online', this.onConnectionStateChanged, false);
    this.connectionStateAlert = new AlertDialog({
      title: 'wifi connection lost',
      message: WARNING,
      buttons: {
        ok: 'yes',
        cancel: 'no'
      }
    }).on({
      closeCancel: () => navigationView.pages().dispose()
    });
  }

  private onConnectionStateChanged = () => {
    if (navigator.connection.type === Connection.WIFI) {
      if (navigationView.pages().length === 0) {
        openSubredditPage('petpictures');
      }
    } else {
      this.connectionStateAlert.open();
    }
  }

}
