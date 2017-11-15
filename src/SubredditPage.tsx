import {
  Action, Composite, TextView, Page, Partial, Properties, WidgetCollection, ImageView, CollectionView,
  PropertyChangedEvent, EventObject
} from 'tabris';
import { property, getById, getByType } from 'tabris-decorators';
import { RedditPost } from './RedditService';
import { RedditListItemCell, RedditGalleryItemCell } from './RedditItemCell';
import { navigationView } from './app';

const EVENT_REQUEST_ITEMS = 'request_items';

type RequestItemsListener = (ev: { target: SubredditPage, count: number }) => void;

export default class SubredditPage extends Page {

  public items: RedditPost[] = [];
  @getByType private collectionView: CollectionView;
  private loading: boolean;
  private galleryMode: boolean;
  private galleryAction: Action;

  constructor(properties?: Properties<SubredditPage>) {
    super(properties);
    this.append(
      new CollectionView({
        refreshIndicator: true,
        left: 0, top: 0, right: 0, bottom: 0,
        background: '#f5f5f5',
        cellHeight: 96,
        cellType: () => this.galleryMode ? 'gallery' : 'list',
        createCell: () => this.galleryMode ? new RedditGalleryItemCell() : new RedditListItemCell(),
        updateCell: (view, index) => (view as any).item = this.items[index].data // TODO: cast interface?
      }).on({
        lastVisibleIndexChanged: this.handleLastVisibleIndexChanged
      })
    );
    this.on({
      appear: this.showGalleryAction,
      disappear: this.hideGalleryAction
    });
  }

  public onRequestItems(listener: RequestItemsListener) {
    return this.on(EVENT_REQUEST_ITEMS, listener);
  }

  public addItems(newItems: RedditPost[]) {
    this.loading = false;
    let insertionIndex = this.items.length;
    this.items = this.items.concat(newItems);
    this.collectionView.insert(insertionIndex, newItems.length);
    this.collectionView.refreshIndicator = false;
  }

  private handleLastVisibleIndexChanged = ({ value }: PropertyChangedEvent<CollectionView, number>) => {
    if (this.items.length - value < 20 && !this.loading) {
      this.loading = true;
      this.trigger(EVENT_REQUEST_ITEMS);
    }
  }

  private showGalleryAction = () => {
    this.galleryAction = new Action({
      title: this.galleryMode ? 'List' : 'Gallery',
      win_symbol: this.galleryMode ? 'List' : 'ViewAll'
    }).on({
      select: this.toggleGalleryMode
    }).appendTo(navigationView);
  }

  private hideGalleryAction = () => {
    this.galleryAction.dispose();
  }

  private toggleGalleryMode = () => {
    this.galleryMode = !this.galleryMode;
    this.galleryAction.win_symbol = this.galleryMode ? 'List' : 'ViewAll';
    this.galleryAction.title = this.galleryMode ? 'List' : 'Gallery';
    this.collectionView.columnCount = this.galleryMode ? 3 : 1; // Todo: doesn't work on windows??
    this.collectionView.load(this.items.length);
  }

}
