import { Page, Properties, PageProperties } from 'tabris';
import { FILL_LAYOUT, RedditPost } from './common';
import { property } from 'tabris-decorators';

export default class RedditPostPage extends Page {

  public jsxProperties: JSX.PageProperties & {item: RedditPost; };
  public tsProperties: PageProperties & {item: RedditPost; };

  @property public readonly item: RedditPost;

  constructor(properties: Properties<RedditPostPage>) {
    super({background: 'black'});
    this.set(properties).append(
        this.item.data.url.endsWith('.jpg')
      ? <imageView {...FILL_LAYOUT} image={this.item.data.url} />
      : <webView {...FILL_LAYOUT} url={this.item.data.url} />
    );
  }

}
