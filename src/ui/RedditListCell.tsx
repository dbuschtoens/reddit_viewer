import { Composite } from 'tabris';
import { component, property } from 'tabris-decorators';
import { RedditPostData } from '../common';

@component export default class RedditListCell extends Composite {

  private _item: RedditPostData;
  @property private commentText: string;
  @property private title: string;
  @property private author: string;
  @property private image: Image;

  constructor() {
    super();
    this.append(
      <composite
          left={16} right={16} top={8} bottom={8}
          cornerRadius={2}
          elevation={2}
          background='white'>
        <imageView id='thumbView'
            width={80} height={80}
            bind-image='image'
            background='#e0e0e0'
            scaleMode='fill' />
        <textView markupEnabled
            top={8} left='prev() 16' right={16}
            bind-text='title'
            textColor='#202020'
            font='medium 14px'
            maxLines={2} />
        <textView
            bottom={8} right={16}
            bind-text='commentText'
            alignment='right'
            textColor='#7CB342'
            font='12px' />
        <textView
            bottom={8} left='#thumbView 16' right='prev() 16'
            bind-text='author'
            textColor='#767676'
            font='12px' />
      </composite>
    );
  }

  public set item(item: RedditPostData) {
    this._item = item;
    this.image = item.thumbnail;
    this.title = item.title,
      this.commentText = item.num_comments + ' comments',
      this.author = item.author;
  }

  public get item() {
    return this._item;
  }

}
