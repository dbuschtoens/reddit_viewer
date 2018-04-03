import { Action, Properties, PropertyChangedEvent, Page } from 'tabris';
import { property, Listeners, event, ChangeListeners } from 'tabris-decorators';
import { ViewMode, isList } from './common';

export default class GalleryAction extends Action {

  public jsxProperties: JSX.ActionProperties & GalleryActionParams;
  @event public readonly onModeChanged: ChangeListeners<ViewMode>;
  @property public mode: ViewMode;
  @property public readonly page: Page;

  constructor(properties: Properties<GalleryAction> & GalleryActionParams) {
    super(properties);
    this.on({select: ev => this.mode = this.mode === ViewMode.List ? ViewMode.Gallery : ViewMode.List});
    this.onModeChanged(this.handleModeChanged);
    this.page.on({appear: this.show, disappear: this.hide});
    this.mode = ViewMode.List;
    this.show();
  }

  private handleModeChanged = () => {
    this.win_symbol = isList(this.mode) ? 'ViewAll' : 'List';
    this.title = isList(this.mode) ? 'Gallery' : 'List';
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
