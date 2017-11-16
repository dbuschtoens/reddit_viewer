import { Action, Properties, PropertyChangedEvent, Page } from 'tabris';
import { property } from 'tabris-decorators';

type Mode = 'gallery' | 'list';

interface GalleryActionParams {page: Page; }

export default class GalleryAction extends Action {

  public jsxProperties: JSX.ActionProperties & GalleryActionParams;

  @property public mode: Mode;
  @property public readonly page: Page;

  constructor(properties: Properties<GalleryAction> & GalleryActionParams) {
    super(properties);
    this.on({select: ev => this.mode = this.mode === 'list' ? 'gallery' : 'list'});
    this.onModeChanged(this.handleModeChanged);
    this.page.on({appear: this.show, disappear: this.hide});
    this.mode = 'gallery';
  }

  public onModeChanged(listener: (ev: PropertyChangedEvent<this, Mode>) => void) {
    this.on('modeChanged', listener);
  }

  private handleModeChanged = () => {
    this.win_symbol = this.mode === 'list' ? 'List' : 'ViewAll';
    this.title = this.mode === 'list' ? 'List' : 'Gallery';
  }

  private show = () => {
    this.page.parent().append(this);
  }

  private hide = () => {
    this.detach();
  }

}
