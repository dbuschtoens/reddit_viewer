import {
  Page, Properties, CollectionView, PropertyChangedEvent, Widget, EventObject,
  CollectionViewSelectEvent
} from 'tabris';
import { getById, component, event, Listeners } from 'tabris-decorators';
import { RedditPost } from './RedditService';
import RedditListCell from './RedditListCell';
import RedditGalleryCell from './RedditGalleryCell';
import { Mode } from './GalleryAction';

@component export default class SubredditPage extends Page {

  @event public readonly onItemSelected: Listeners<{item: RedditPost}>;
  @event public readonly onItemsRequested: Listeners;

  private _items: RedditPost[] = [];
  private _mode: Mode;
  private loading: boolean;
  @getById private collectionView: CollectionView;

  constructor(properties?: Properties<SubredditPage>) {
    super(properties);
    this.append(
      <collectionView id='collectionView'
          left={0} top={0} right={0} bottom={0}
          background='#f5f5f5'
          cellType={() => this._mode}
          cellHeight={(index, type) => isList(type) ? 96 : 160}
          createCell={type => isList(type) ? new RedditListCell() : new RedditGalleryCell()}
          updateCell={(view, index) => asRedditCell(view).item = this._items[index].data}
          onSelect={ev => this.onItemSelected.trigger({item: this._items[ev.index]})}
          onLastVisibleIndexChanged={this.handleLastVisibleIndexChanged}/>
    );
  }

  public set mode(mode: Mode) {
    if (this._mode !== mode) {
      this._mode = mode;
      this.collectionView.columnCount = isList(this.mode) ? 1 : 3;
      this.collectionView.load(this.items.length);
    }
  }

  public get mode() {
    return this._mode;
  }

  public get items() {
    return this._items.concat(); // safe copy
  }

  public addItems(newItems: RedditPost[]) {
    this.loading = false;
    let insertionIndex = this._items.length;
    this._items = this._items.concat(newItems);
    this.collectionView.insert(insertionIndex, newItems.length);
    this.collectionView.refreshIndicator = false;
  }

  private handleLastVisibleIndexChanged = ({ value }: PropertyChangedEvent<CollectionView, number>) => {
    if (this._items.length - value < (20 / this.collectionView.columnCount) && !this.loading) {
      this.loading = true;
      this.onItemsRequested.trigger();
    }
  }

}

function isList(type: string): boolean {
  return type === 'list';
}

function asRedditCell(view: Widget): RedditListCell | RedditGalleryCell {
  if (view instanceof RedditListCell || view instanceof RedditGalleryCell) {
    return view;
  }
  throw new Error('Unexpected cell type');
}
