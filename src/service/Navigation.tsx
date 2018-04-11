import { NavigationView, Page, ui, WidgetCollection } from 'tabris';
import { inject, shared } from 'tabris-decorators';
import { FILL_LAYOUT } from '../common';
import SubredditSelectorView from '../ui/SubredditSelectorView';

@shared export default class Navigation {

  private navigationView: NavigationView = (
    <navigationView {...FILL_LAYOUT} drawerActionVisible />
  );

  constructor(
    @inject private readonly subredditSelectorView: SubredditSelectorView
  ) {
    this.navigationView.appendTo(ui.contentView);
    this.subredditSelectorView.set(FILL_LAYOUT);
    this.subredditSelectorView.appendTo(ui.drawer);
    this.subredditSelectorView.onSelect(() => ui.drawer.close());
    ui.drawer.enabled = true;
  }

  public navigateTo(target: object) {
    if (!(target instanceof Page)) {
      throw new Error('Unknown target');
    }
    const pageStack = this.navigationView.pages().toArray();
    const pageIndex = pageStack.indexOf(target);
    if (pageIndex !== -1) {
      new WidgetCollection(pageStack.slice(pageIndex + 1)).dispose();
    } else {
      this.navigationView.append(target);
    }
  }

}
