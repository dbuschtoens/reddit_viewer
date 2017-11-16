import { Composite, ImageView, TextView, Properties, Partial, Widget } from 'tabris';
import { bind, getByType, property } from 'tabris-decorators';
import { RedditPostData } from './RedditService';
import { navigationView } from './app';
import DetailsPage from './DetailsPage';

export interface RedditCell {
  item: RedditPostData;
}

export default class RedditGalleryCell extends Composite {

  private _item: RedditPostData;
  @getByType private itemImageView: ImageView;
  private url: string;
  private title: string;

  constructor() {
    super();
    this.append(
      <composite highlightOnTouch
          left={4} right={4} top={4} bottom={4}
          cornerRadius={2}
          elevation={2}
          background='white'
          onTap={this.openDetailsPage}>
        <imageView
            id='itemImage'
            background='#e0e0e0'
            scaleMode='fill' />
      </composite>
    );
  }

  public set item(item: RedditPostData) {
    this.itemImageView.image = item.thumbnail;
    this.title = item.title;
    this.url = item.url;
  }

  public get item() { return this._item; }

  private openDetailsPage = () => {
    new DetailsPage(this.title, this.url).appendTo(navigationView);
  }

}

export function isRedditCell(view: Widget | RedditCell): view is RedditCell {
  return 'item' in view;
}
