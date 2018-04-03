import { ui } from 'tabris';
import { SUBREDDIT } from './common';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './SubredditPresenter';

ui.contentView.append(
  <navigationView left={0} top={0} right= {0} bottom={0}>
    <SubredditPage />
  </navigationView>
);

const subredditPresenter = new SubredditPresenter(ui.find(SubredditPage).first(), SUBREDDIT);
subredditPresenter.loadItems(25);
