import { Action, Page } from 'tabris';
import { ChangeListener, ChangeListeners, event, property } from 'tabris-decorators';
import { isList, ViewMode, ViewModeToggleView } from '../common';

export default class ViewModeToggleAction extends Action implements ViewModeToggleView {

  public jsxProperties: JSX.ActionProperties
    & {onModeChanged?: ChangeListener<ViewMode>}
    & Partial<ViewModeToggleAction>;

  @property public mode: ViewMode;
  @property public readonly page: Page;
  @event public readonly onModeChanged: ChangeListeners<ViewMode>;

  constructor(properties: Partial<ViewModeToggleAction>) {
    super(properties);
    this.on({select: this.handleSelect});
    this.onModeChanged(this.handleModeChanged);
    this.mode = ViewMode.List;
    this.page.on({
      appear: () => this.attach(),
      disappear: () => this.detach()
    });
  }

  private handleSelect = () => {
    this.mode = this.mode === ViewMode.List ? ViewMode.Gallery : ViewMode.List;
  }

  private handleModeChanged = () => {
    this.win_symbol = isList(this.mode) ? 'ViewAll' : 'List';
    this.title = isList(this.mode) ? 'Gallery' : 'List';
  }

  private attach() {
    this.page.parent().append(this);
  }

}
