import { CollectionView, Composite } from 'tabris';
import { ChangeListeners, component, event, getById, injectable, Listener, Listeners, property, ComponentJSX } from 'tabris-decorators';
import * as common from '../common';
import { FILL_LAYOUT } from '../common';

@component
@injectable({implements: common.SubredditSelectorView, shared: true})
export default class SubredditSelectorView
  extends Composite
  implements common.SubredditSelectorView
{

  @property public selectionIndex: number = 0;
  @event public readonly onSelect: Listeners<{index: number}>;
  @event public readonly onSelectionIndexChanged: ChangeListeners<number>;

  private _items: string[] = [];
  @getById private collectionView: CollectionView;
  private jsxProperties: ComponentJSX<this>;

  constructor(properties?: Partial<SubredditSelectorView>) {
    super(properties);
    this.onSelect(ev => this.selectionIndex = ev.index);
    this.append(
      <collectionView id='collectionView'
          {...FILL_LAYOUT}
          cellHeight={64}
          createCell={() => new TextCell()}
          updateCell={(view, index) => (view as TextCell).text = this._items[index]}
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
