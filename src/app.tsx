import { ui } from 'tabris';
import { SUBREDDIT, FILL_LAYOUT } from './common';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './SubredditPresenter';
import GalleryAction from './GalleryAction';

ui.contentView.append(
  <navigationView {...FILL_LAYOUT}>
    <GalleryAction/>
    <SubredditPage />
  </navigationView>
);

const subredditPresenter = new SubredditPresenter(
  SUBREDDIT,
  ui.find(SubredditPage).first(),
  ui.find(GalleryAction).first()
);
subredditPresenter.loadItems(25);
