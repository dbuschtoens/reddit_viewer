import { Page, ImageView, WebView, Widget, WidgetCollection, Properties, Partial } from 'tabris';
import { RedditPost } from './RedditService';
export default class DetailsPage extends Page {
    constructor(title: string, url: string) {
        super({background: 'black', title});
        this.append(
            createDetailsContent(url)
        );
    }
}

function createDetailsContent(url: string) {
    if (url.substr(-4, 4) === '.jpg') {
        return new ImageView({
            left: 0, top: 0, right: 0, bottom: 0,
            image: url,
            scaleMode: 'fit'
        });
    } else {
        return new WebView({
            left: 0, top: 0, right: 0, bottom: 0, url
        });
    }
}
