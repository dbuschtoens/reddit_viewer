import {
  Page, Properties, CollectionView, PropertyChangedEvent, Widget, EventObject,
  CollectionViewSelectEvent
} from 'tabris';
import { getByType } from 'tabris-decorators';
import { RedditPost } from './RedditService';
import RedditListCell from './RedditListCell';
import RedditGalleryCell from './RedditGalleryCell';
import GalleryAction from './GalleryAction';

const EVENT_ITEMS_REQUESTED = 'itemsRequested';
const EVENT_ITEM_SELECTED = 'itemSelected';

type ItemSelectedEvent = EventObject<SubredditPage> & {item: RedditPost};
type ItemsRequestedListener = (ev: EventObject<SubredditPage>) => void;
type ItemSelectedListener = (ev: ItemSelectedEvent) => void;

export default class SubredditPage extends Page {

  public galleryAction: GalleryAction;

  private _items: RedditPost[] = [];
  private _galleryMode: boolean;
  private loading: boolean = true;
  @getByType private collectionView: CollectionView;

  constructor(properties?: Properties<SubredditPage>) {
    super(properties);
    this.append(
      <collectionView refreshEnabled
          left={0} top={0} right={0} bottom={0}
          background='#f5f5f5'
          cellHeight={this.cellHeight}
          createCell={this.createCell}
          updateCell={this.updateCell}
          onSelect={this.handleSelect}/>
    );
  }

  public onItemSelected(listener: ItemSelectedListener) {
    return this.on(EVENT_ITEM_SELECTED, listener);
  }

  // public onItemsRequested(listener: ItemsRequestedListener) {
  //   return this.on(EVENT_ITEMS_REQUESTED, listener);
  // }

  // public set galleryMode(galleryMode: boolean) {
  //   this._galleryMode = galleryMode;
  //   this.collectionView.columnCount = this.galleryMode ? 3 : 1;
  //   this.collectionView.load(this.items.length);
  // }

  // public get galleryMode() { return this._galleryMode; }

  public get items() { return this._items.concat(); } // safe copy

  public addItems(newItems: RedditPost[]) {
    this.loading = false;
    let insertionIndex = this._items.length;
    this._items = this._items.concat(newItems);
    this.collectionView.insert(insertionIndex, newItems.length);
    this.collectionView.refreshIndicator = false;
  }

  // Handler:

  // private handleLastVisibleIndexChanged = ({ value }: PropertyChangedEvent<CollectionView, number>) => {
  //   if (this.items.length - value < (20 / this.collectionView.columnCount) && !this.loading) {
  //     this.loading = true;
  //     this.trigger(EVENT_ITEMS_REQUESTED);
  //   }
  // }

  private handleSelect = ({index}: CollectionViewSelectEvent) => {
    let item = this.items[index];
    let eventObject: ItemSelectedEvent = Object.assign(new EventObject<this>(), {item});
    this.trigger(EVENT_ITEM_SELECTED, eventObject);
  }

  // Callbacks:

  private createCell = () => new RedditGalleryCell();

  private cellHeight = () => 160;

  private updateCell = (view: Widget, index: number) => {
    if (view instanceof RedditGalleryCell) {
      view.item = this._items[index].data;
    }
  }

}
