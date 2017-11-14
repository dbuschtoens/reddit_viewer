import { Composite, ImageView, TextView } from 'tabris';
import { getByType, getById } from 'tabris-decorators';
import { RedditData } from './interfaces';
import { navigationView } from './app';
import DetailsPage from './DetailsPage';

export default class RedditItemCell extends Composite {
    private itemData: RedditData;
    @getById private itemImage: ImageView;
    @getById private nameText: TextView;
    @getById private commentText: TextView;
    @getById private authorText: TextView;
    
    constructor() {
        super();
        this.append(
            <composite
                left={16} right={16} top={8} bottom={8}
                cornerRadius={2}
                elevation={2}
                background='white'
                highlightOnTouch={true}
                onTap={() => new DetailsPage(this.itemData).appendTo(navigationView)}>
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
                    textColor='#7CB34'
                    font='12px' />
                <textView
                    id='authorText'
                    bottom={8} left='#itemImage 16' right='#commentText 16'
                    textColor='#767676'
                    font='12px' />
            </composite>
        );
    }

    applyData(data: RedditData) {
        this.itemData = data;
        this.itemImage.image = { src: data.thumbnail, width: 80, height: 80 }
        this.nameText.text = data.title;
        this.commentText.text = data.num_comments + ' comments';
        this.authorText.text = data.author;
    }

}