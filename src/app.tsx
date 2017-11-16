import { ui } from 'tabris';
import SubredditPage from './SubredditPage';
import SubredditPresenter from './SubredditPresenter';

const SUBREDDIT = 'petpictures';

ui.contentView.append(
  <navigationView left={0} top={0} right= {0} bottom={0}>
    <SubredditPage />
  </navigationView>
);

let subredditPresenter = new SubredditPresenter(ui.find(SubredditPage).first(), SUBREDDIT);
subredditPresenter.autoFetchCount = 10;
subredditPresenter.loadItems(25);
