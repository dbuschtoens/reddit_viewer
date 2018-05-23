import { Page } from 'tabris';
import { property, ComponentJSX } from 'tabris-decorators';
import { FILL_LAYOUT, RedditPost } from '../common';

export default class RedditPostPage extends Page {

  @property public readonly item: RedditPost;
  private jsxProperties: ComponentJSX<this>;

  constructor(properties: Partial<RedditPostPage>) {
    super({background: 'black'});
    this.set(properties).append(
        this.item.data.url.endsWith('.jpg')
      ? <imageView {...FILL_LAYOUT} image={this.item.data.url} />
      : <webView {...FILL_LAYOUT} url={this.item.data.url} />
    );
  }

}
