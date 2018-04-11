import { ChangeListeners, Listeners } from 'tabris-decorators';

export const FILL_LAYOUT = { left: 0, top: 0, right: 0, bottom: 0 };

export const INITIAL_ITEM_COUNT = 25;

export const AUTO_FETCH_COUNT = 10;

export const DEFAULT_REDDITS = [
  'Pics',
  'PetPictures',
  'AdviceAnimals',
  'Art',
  'Memes'
];

export enum ViewMode { Gallery = 'gallery', List = 'list' }

export const isList = (viewMode: string) => viewMode === ViewMode.List;

export interface RedditPost {
  kind: string;
  data: RedditPostData;
}

export interface RedditPostData {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  num_comments: number;
  author: string;
}

export interface RedditJsonResponse {
  data: {
    children: RedditPost[]
  };
}

export abstract class SubredditSelectorView {
  public abstract items: string[];
  public abstract selectionIndex: number;
  public abstract onSelectionIndexChanged: ChangeListeners<number>;
}

export abstract class ViewModeToggleView {
  public mode: ViewMode;
  public onModeChanged: ChangeListeners<ViewMode>;
}

export abstract class SubredditView {
  public title: string;
  public mode: ViewMode;
  public items: RedditPost[];
  public readonly viewModeToggleView: ViewModeToggleView;
  public readonly onItemsRequested: Listeners;
  public readonly onItemSelected: Listeners<{item: RedditPost}>;
  public abstract addItems(items: RedditPost[]): any;
  public abstract clear(): any;
}
