import { Composite, ImageView } from 'tabris';
import { component, getById } from 'tabris-decorators';
import { FILL_LAYOUT, RedditPostData } from '../common';

@component export default class RedditGalleryCell extends Composite {

  private _item: RedditPostData;
  @getById private thumbView: ImageView;

  constructor() {
    super();
    this.append(
      <imageView id='thumbView'
          {...FILL_LAYOUT}
          background='#e0e0e0'
          scaleMode='fill' />
    );
  }

  public set item(item: RedditPostData) {
    this.thumbView.image = item.thumbnail;
  }

  public get item() {
    return this._item;
  }

}
