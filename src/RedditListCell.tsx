import { Composite, ImageView, TextView, Properties, Partial, Widget } from 'tabris';
import { bind, getByType, property } from 'tabris-decorators';
import { RedditPostData } from './RedditService';
import { navigationView } from './app';
import DetailsPage from './DetailsPage';

export default class RedditListCell extends Composite {

  private _item: RedditPostData;
  private url: string;
  @getByType private itemImageView: ImageView;
  @bind('commentText.text') private commentText: string;
  @bind('nameText.text') private title: string;
  @bind('authorText.text') private author: string;

  constructor() {
    super();
    this.append(
      <composite highlightOnTouch
          left={16} right={16} top={8} bottom={8}
          cornerRadius={2}
          elevation={2}
          background='white'
          onTap={this.openDetailsPage}>
        <imageView
            id='itemImage'
            background='#e0e0e0'
            width={80} height={80}
            scaleMode='fill' />
        <textView
            id='nameText'
            top={8} left={['#itemImage', 16]} right={16}
            textColor='#202020'
            font='medium 14px'
            maxLines={2} />
        <textView
            id='commentText'
            bottom={8} right={16}
            alignment='right'
            textColor='#7CB342'
            font='12px' />
        <textView
            id='authorText'
            bottom={8} left='#itemImage 16' right='#commentText 16'
            textColor='#767676'
            font='12px' />
      </composite>
    );
  }

  public set item(item: RedditPostData) {
    this._item = item;
    this.itemImageView.image = this._item.thumbnail;
    this.title = this._item.title,
    this.url = this._item.url,
    this.commentText = this._item.num_comments + ' comments',
    this.author = this._item.author;
  }

  public get item() { return this._item; }

  private openDetailsPage = () => {
    new DetailsPage(this.title, this.url).appendTo(navigationView);
  }

}
