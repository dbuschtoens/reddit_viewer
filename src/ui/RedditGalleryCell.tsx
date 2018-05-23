import { Composite } from 'tabris';
import { component, property } from 'tabris-decorators';
import { FILL_LAYOUT, RedditPostData } from '../common';

@component export default class RedditGalleryCell extends Composite {

  @property public item: RedditPostData;

  constructor() {
    super();
    this.append(
      <imageView
          {...FILL_LAYOUT}
          bind-image='item.thumbnail'
          background='#e0e0e0'
          scaleMode='fill' />
    );
  }

}
