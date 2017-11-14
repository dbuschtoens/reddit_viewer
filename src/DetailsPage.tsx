import { Page, ImageView, WebView, Widget, WidgetCollection, Properties, Partial } from 'tabris';
import { RedditData } from './interfaces';
export default class DetailsPage extends Page {
    constructor(data: RedditData) {
        super({background: 'black', title: data.title});
        this.append(
            <CreateDetailsContent data={data} />
        )
    }
}

function CreateDetailsContent(properties: { data: RedditData }, children: any): WidgetCollection<Widget> {
    let result: Widget;
    if (properties.data.url.substr(-4, 4) === '.jpg') {
        result = new ImageView({
            left: 0, top: 0, right: 0, bottom: 0,
            image: properties.data.url,
            scaleMode: 'fit'
        });
    } else {
        result = new WebView({
            left: 0, top: 0, right: 0, bottom: 0,
            url: properties.data.url
        });
    }
    return new WidgetCollection([result]);
}
