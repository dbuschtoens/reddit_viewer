import { Composite } from 'tabris';
import { component, property } from 'tabris-decorators';
import { RedditPostData } from '../common';

@component export default class RedditListCell extends Composite {

  @property public item: RedditPostData;

  constructor() {
    super();
    this.append(
      <composite
          left={16} right={16} top={8} bottom={8}
          cornerRadius={2}
          elevation={2}
          background='white'>
        <imageView
            width={80} height={80}
            bind-image='item.thumbnail'
            background='#e0e0e0'
            scaleMode='fill' />
        <textView markupEnabled
            top={8} left='prev() 16' right={16}
            bind-text='item.title'
            textColor='#202020'
            font='medium 14px'
            maxLines={2} />
        <textView
            bottom={8} right={16}
            template-text='${item.num_comments} comments'
            alignment='right'
            textColor='#7CB342'
            font='12px' />
        <textView
            bottom={8} left='#thumbView 16' right='prev() 16'
            bind-text='item.author'
            textColor='#767676'
            font='12px' />
      </composite>
    );
  }

}
