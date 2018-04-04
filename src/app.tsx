import { ui } from 'tabris';
import { injector } from 'tabris-decorators';
import { DEFAULT_REDDITS, FILL_LAYOUT } from './common';
import SubredditPage from './SubredditPage';
import * as subredditPresenter from './SubredditPresenter';
import SubredditSelectorPresenter from './SubredditSelectorPresenter';
import * as selectorPresenter from './SubredditSelectorPresenter';
import SubredditSelectorView from './SubredditSelectorView';
import ViewModeToggleAction from './ViewModeToggleAction';

ui.contentView.append(
  <navigationView {...FILL_LAYOUT} drawerActionVisible>
    <ViewModeToggleAction />
    <SubredditPage />
  </navigationView>
);

ui.drawer.set({ enabled: true }).append(
  <SubredditSelectorView
      {...FILL_LAYOUT}
      onSelect={() => ui.drawer.close()} />
);

injector.addHandler(subredditPresenter.ViewModeToggleView, () => ui.find(ViewModeToggleAction).first());
injector.addHandler(subredditPresenter.SubredditView, () => ui.find(SubredditPage).first());
injector.addHandler(selectorPresenter.SubredditSelectorView, () => ui.find(SubredditSelectorView).first());
injector.resolve(SubredditSelectorPresenter).subreddits = DEFAULT_REDDITS;
