import { CollectionView, Composite, Page, Properties, Widget } from 'tabris';
import { ChangeListener, ChangeListeners, component, event, getById, Listener, Listeners, property } from 'tabris-decorators';
import { FILL_LAYOUT, ViewMode } from './common';
import * as presenter from './SubredditSelectorPresenter';

@component export default class SubredditSelectorView
  extends Composite
  implements presenter.SubredditSelectorView
{

  @property public selectionIndex: number = 0;
  @event public readonly onSelect: Listeners<{index: number}>;
  @event public readonly onSelectionIndexChanged: ChangeListeners<number>;

  private _items: string[] = [];
  @getById private collectionView: CollectionView;
  private jsxProperties: JSX.CompositeProperties & Properties<SubredditSelectorView> & {
    onSelectionIndexChanged?: ChangeListener<number>,
    onSelect?: Listener<{index: number}>
  };

  constructor(properties?: Properties<SubredditSelectorView>) {
    super(properties);
    this.onSelect(ev => this.selectionIndex = ev.index);
    this.append(
      <collectionView id='collectionView'
          {...FILL_LAYOUT}
          cellHeight={64}
          createCell={type => new TextCell()}
          updateCell={(view, index) => TextCell.cast(view).text = this._items[index]}
          onSelect={this.onSelect.trigger}/>
    );
  }

  public set items(items: string[]) {
    this._items = items.concat();
    this.collectionView.load(this._items.length);
  }

  public get items() {
    return this._items.concat();
  }

}

@component class TextCell extends Composite {

  public static cast(view: Widget): TextCell {
    if (view instanceof TextCell) {
      return view;
    }
    throw new Error('Unexpected cell type');
  }

  @property public text: string;

  constructor() {
    super({highlightOnTouch: true});
    this.append(
      <widgetCollection>
        <textView
          left={16} top={0} right={0} bottom={1}
          bind-text='text'
          background='white'
          font='20px sans-serif'/>
        <composite left={0} height={1} right={0} bottom={0} background='#dfdfdf'/>
      </widgetCollection>
    );
  }

}
