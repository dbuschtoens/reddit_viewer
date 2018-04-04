import {
  Page, Properties, CollectionView, PropertyChangedEvent, Widget, EventObject,
  CollectionViewSelectEvent
} from 'tabris';
import { getById, component, event, Listeners } from 'tabris-decorators';
import RedditListCell from './RedditListCell';
import RedditGalleryCell from './RedditGalleryCell';
import { FILL_LAYOUT, ViewMode, isList, RedditPost } from './common';
import * as presenter from './SubredditPresenter';

@component export default class SubredditPage extends Page implements presenter.SubredditView {

  @event public readonly onItemSelected: Listeners<{item: RedditPost}>;
  @event public readonly onItemsRequested: Listeners;
  @event public readonly onAppear: Listeners;
  @event public readonly onDisappear: Listeners;

  private _items: RedditPost[] = [];
  private _mode: ViewMode;
  private loading: boolean;
  @getById private collectionView: CollectionView;

  constructor(properties?: Properties<SubredditPage>) {
    super(properties);
    this.append(
      <collectionView id='collectionView'
          {...FILL_LAYOUT}
          background='#f5f5f5'
          cellType={() => this._mode}
          cellHeight={(index, type) => isList(type) ? 96 : 160}
          createCell={type => isList(type) ? new RedditListCell() : new RedditGalleryCell()}
          updateCell={(view, index) => asRedditCell(view).item = this._items[index].data}
          onSelect={ev => this.onItemSelected.trigger({item: this._items[ev.index]})}
          onLastVisibleIndexChanged={this.handleLastVisibleIndexChanged}/>
    );
  }

  public set mode(mode: ViewMode) {
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

  public clear() {
    this._items = [];
    this.collectionView.itemCount = 0;
  }

  public addItems(newItems: RedditPost[]) {
    this.loading = false;
    const insertionIndex = this._items.length;
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

function asRedditCell(view: Widget): RedditListCell | RedditGalleryCell {
  if (view instanceof RedditListCell || view instanceof RedditGalleryCell) {
    return view;
  }
  throw new Error('Unexpected cell type');
}
