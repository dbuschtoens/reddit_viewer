import { ui } from 'tabris';
import { SUBREDDIT, FILL_LAYOUT } from './common';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './SubredditPresenter';
import ViewModeToggleAction from './GalleryAction';

ui.contentView.append(
  <navigationView {...FILL_LAYOUT}>
    <ViewModeToggleAction/>
    <SubredditPage />
  </navigationView>
);

const subredditPresenter = new SubredditPresenter(
  SUBREDDIT,
  ui.find(SubredditPage).first(),
  ui.find(ViewModeToggleAction).first()
);
subredditPresenter.loadItems(25);
