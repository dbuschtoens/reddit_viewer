import { Action, Properties } from 'tabris';
import { ChangeListener, ChangeListeners, event, property } from 'tabris-decorators';
import { isList, ViewMode } from './common';
import * as presenter from './SubredditPresenter';

export default class ViewModeToggleAction extends Action implements presenter.ViewModeToggleView {

  public jsxProperties: JSX.ActionProperties & {onModeChanged?: ChangeListener<ViewMode>};
  @event public readonly onModeChanged: ChangeListeners<ViewMode>;
  @property public mode: ViewMode;

  constructor(properties: Properties<ViewModeToggleAction>) {
    super(properties);
    this.on({select: ev => this.mode = this.mode === ViewMode.List ? ViewMode.Gallery : ViewMode.List});
    this.onModeChanged(this.handleModeChanged);
    this.mode = ViewMode.List;
  }

  private handleModeChanged = () => {
    this.win_symbol = isList(this.mode) ? 'ViewAll' : 'List';
    this.title = isList(this.mode) ? 'Gallery' : 'List';
  }

}
