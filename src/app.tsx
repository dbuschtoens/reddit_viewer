import { ui, NavigationView } from 'tabris';
import { FILL_LAYOUT, DEFAULT_REDDITS } from './common';
import SubredditPage from './SubredditPage';
import ViewModeToggleAction from './ViewModeToggleAction';
import { injector } from 'tabris-decorators';
import SubredditSelectorView from './SubredditSelectorView';
import SubredditSelectorPresenter from './SubredditSelectorPresenter';
import * as selectorPresenter from './SubredditSelectorPresenter';
import * as subredditPresenter from './SubredditPresenter';

ui.contentView.append(
  <navigationView {...FILL_LAYOUT} drawerActionVisible>
    <ViewModeToggleAction/>
    <SubredditPage />
  </navigationView>
);

ui.drawer.set({enabled: true}).append(
  <SubredditSelectorView
    {...FILL_LAYOUT}
    onSelect={() => ui.drawer.close()}/>
);

injector.addHandler(subredditPresenter.ViewModeToggleView, () => ui.find(ViewModeToggleAction).first());
injector.addHandler(subredditPresenter.SubredditView, () => ui.find(SubredditPage).first());
injector.addHandler(selectorPresenter.SubredditSelectorView, () => ui.find(SubredditSelectorView).first());
injector.resolve(SubredditSelectorPresenter).subreddits = DEFAULT_REDDITS;
