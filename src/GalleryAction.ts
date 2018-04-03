import { Action, Properties, PropertyChangedEvent, Page } from 'tabris';
import { property, Listeners, event, ChangeListeners } from 'tabris-decorators';

export type Mode = 'gallery' | 'list';

export default class GalleryAction extends Action {

  public jsxProperties: JSX.ActionProperties & GalleryActionParams;
  @event public readonly onModeChanged: ChangeListeners<Mode>;
  @property public mode: Mode;
  @property public readonly page: Page;

  constructor(properties: Properties<GalleryAction> & GalleryActionParams) {
    super(properties);
    this.on({select: ev => this.mode = this.mode === 'list' ? 'gallery' : 'list'});
    this.onModeChanged(this.handleModeChanged);
    this.page.on({appear: this.show, disappear: this.hide});
    this.mode = 'list';
    this.show();
  }

  private handleModeChanged = () => {
    this.win_symbol = this.mode === 'gallery' ? 'List' : 'ViewAll';
    this.title = this.mode === 'gallery' ? 'List' : 'Gallery';
  }

  private show = () => {
    if (this.page.parent()) {
      this.page.parent().append(this);
    }
  }

  private hide = () => {
    this.detach();
  }

}

interface GalleryActionParams { page: Page; }
