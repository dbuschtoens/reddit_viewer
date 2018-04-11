import { resolve } from 'tabris-decorators';
import { DEFAULT_REDDITS } from './common';
import SubredditPresenter from './presenter/SubredditPresenter';
import SubredditSelectorPresenter from './presenter/SubredditSelectorPresenter';
import Navigation from './service/Navigation';
import './ui/SubredditPage';
import './ui/SubredditSelectorView';
import './ui/ViewModeToggleAction';

resolve(SubredditSelectorPresenter).subreddits = DEFAULT_REDDITS;
resolve(Navigation).navigateTo(resolve(SubredditPresenter).view);
