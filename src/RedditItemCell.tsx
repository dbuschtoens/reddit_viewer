import { Composite, ImageView, TextView, Properties, Partial, Widget } from 'tabris';
import { bind, getByType, property } from 'tabris-decorators';
import { RedditPostData } from './RedditService';
import { navigationView } from './app';
import DetailsPage from './DetailsPage';

type RedditGalleryItemCellProperties = 'title' | 'thumbnail' | 'url';

type RedditListItemCellProperties = RedditGalleryItemCellProperties | 'commentText' | 'author';

export interface RedditCell {
  item: RedditPostData;
}

export function isRedditCell(view: Widget | RedditCell): view is RedditCell {
  return 'item' in view;
}
export class RedditGalleryCell extends Composite {

  public readonly tsProperties: Properties<Composite> & Partial<this, RedditGalleryItemCellProperties>;

  @property public item: RedditPostData;
  @property public url: string;
  @property public title: string;
  @getByType private itemImageView: ImageView;

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
    this.on('itemChanged', ({ value }) => this.applyData(value));
  }

  public set thumbnail(image: Image) {
    this.itemImageView.image = image;
  }

  public get thumbnail() {
    return this.itemImageView.image;
  }

  protected applyData(item: RedditPostData) {
    this.set({
      thumbnail: item.thumbnail,
      title: item.title,
      url: item.url
    });
  }

  protected openDetailsPage = () => {
    new DetailsPage(this.title, this.url).appendTo(navigationView);
  }

}

export class RedditListCell extends Composite {

  public readonly tsProperties: Properties<Composite> & Partial<this, RedditListItemCellProperties>;

  @property public item: RedditPostData;
  @property public url: string;
  @bind('commentText.text') public commentText: string;
  @bind('nameText.text') public title: string;
  @bind('authorText.text') public author: string;
  @getByType private itemImageView: ImageView;

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
    this.on('itemChanged', ({ value }) => this.applyData(value));
  }

  public set thumbnail(image: Image) {
    this.itemImageView.image = image;
  }

  public get thumbnail() {
    return this.itemImageView.image;
  }

  private applyData(item: RedditPostData) {
    this.set({
      thumbnail: item.thumbnail,
      title: item.title,
      url: item.url,
      commentText: item.num_comments + ' comments',
      author: item.author
    });
  }

  private openDetailsPage = () => {
    new DetailsPage(this.title, this.url).appendTo(navigationView);
  }

}
