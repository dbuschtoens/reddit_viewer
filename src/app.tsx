import { ui } from 'tabris';
import { SUBREDDIT, FILL_LAYOUT } from './common';
import SubredditPage from './SubredditPage';
import SubredditPresenter, { SubredditView, ViewModeToggleView } from './SubredditPresenter';
import ViewModeToggleAction from './ViewModeToggleAction';
import { injector } from 'tabris-decorators';

ui.contentView.append(
  <navigationView {...FILL_LAYOUT}>
    <ViewModeToggleAction/>
    <SubredditPage />
  </navigationView>
);

injector.addHandler(SubredditView, () => ui.find(SubredditPage).first());
injector.addHandler(ViewModeToggleView, () => ui.find(ViewModeToggleAction).first());
injector.create(SubredditPresenter, [SUBREDDIT]).loadItems(25);
