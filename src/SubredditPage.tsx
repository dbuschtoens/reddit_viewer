import { Composite, TextView, Page, Partial, Properties, WidgetCollection, ImageView, CollectionView } from 'tabris';
import { property, getById, getByType } from 'tabris-decorators';
import { RedditData, RedditItem, RedditUrlParameters } from './interfaces';
import RedditItemCell from './RedditItemCell'

const ITEM_FETCH_COUNT = 25;

export default class SubredditPage extends Page {

    public readonly jsxProperties: JSX.PageProperties & Partial<this, 'subreddit'>;

    public readonly tsProperties: Properties<Page> & Partial<this, 'subreddit'>;

    @property public subreddit: string;
    @getByType private collectionView: CollectionView;

    private loading: boolean;
    private items: RedditItem[] = [];

    constructor(properties: Properties<SubredditPage>) {
        super(Object.assign(properties, { title: 'Reddit - ' + properties.subreddit }));
        this.append(
            <collectionView
                left={0} top={0} right={0} bottom={0}
                background='#f5f5f5'
                refreshEnabled={true}
                cellHeight={96}
                cellType={index => this.items[index].loading ? 'loading' : 'normal'}
                createCell={type => type === 'normal' ? new RedditItemCell() : this.createLoadingCell()}
                updateCell={(view, index) => {
                    if (view instanceof RedditItemCell) {
                        view.applyData(this.items[index].data);
                    }
                }}
                onRefresh={this.loadNewItems}
                onScroll={({ target: scrollView, deltaY }) => {
                    if (deltaY > 0) {
                        let remaining = this.items.length - scrollView.lastVisibleIndex;
                        if (remaining < 20) {
                            this.loadMoreItems();
                        }
                    }
                }} />
        );
        this.loadInitialItems();
    }

    createLoadingCell() {
        return new TextView({
            centerY: 0,
            alignment: 'center',
            text: 'Loading...'
        });
    }

    loadInitialItems() {
        this.collectionView.refreshIndicator = true;
        this.getJSON(this.createUrl({ limit: ITEM_FETCH_COUNT })).then(json => {
            this.items = json.data.children;
            this.collectionView.itemCount = this.items.length;
            this.collectionView.refreshIndicator = false;
        });
    }

    loadNewItems() {
        if (!this.loading) {
            this.loading = true;
            this.getJSON(this.createUrl({ limit: ITEM_FETCH_COUNT, before: this.getFirstId() })).then(json => {
                this.loading = false;
                this.collectionView.refreshIndicator = false;
                if (json.data.children.length > 0) {
                    this.items.splice(0, 0, ...json.data.children);
                    this.collectionView.insert(0, json.data.children.length);
                    this.collectionView.reveal(0);
                }
            });
        }
    }

    loadMoreItems() {
        if (!this.loading) {
            this.loading = true;
            let lastId = this.getLastId();
            // insert placeholder item
            this.items.push({ loading: true });
            this.collectionView.insert(this.items.length, 1);
            this.getJSON(this.createUrl({ limit: ITEM_FETCH_COUNT, after: lastId })).then(json => {
                this.loading = false;
                // remove placeholder item
                this.items.splice(this.items.length - 1, 1);
                this.collectionView.remove(-1);
                // insert new items
                let insertionIndex = this.items.length;
                this.items = this.items.concat(json.data.children);
                this.collectionView.insert(insertionIndex, json.data.children.length);
            });
        }
    }

    createUrl(params: RedditUrlParameters) {
        let url = 'http://www.reddit.com/r/' + this.subreddit + '.json?' + 'limit=' + params.limit;
        if (params.before) {
            url += 'before=' + params.before;
        }
        if (params.after) {
            url += 'after=' + params.after;
        }
        return url;
    }


    getFirstId() {
        return this.getRedditId(this.items[0]) || null;
    }

    getLastId() {
        return this.getRedditId(this.items[this.items.length - 1]) || null;
    }

    getRedditId(item: RedditItem) {
        return item ? item.kind + '_' + item.data.id : null;
    }


    getJSON(url: string): Promise<{ data: { children: RedditItem[] } }> {
        return fetch(url).then(response => response.json());
    }
}
