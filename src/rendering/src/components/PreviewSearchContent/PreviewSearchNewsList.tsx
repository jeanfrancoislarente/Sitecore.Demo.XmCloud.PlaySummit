import Link from 'next/link';
import router from 'next/router';
import NewsCard, { NewsCardProps } from './NewsCard';

export type NewsListProps = {
  resultsUrl: string;
  list?: NewsCardProps[];
  closePopup: () => void;
};

const VIEW_ALL_NEWS_URL = '/news';

const PreviewSearchNewsList = (props: NewsListProps): JSX.Element => {
  const { resultsUrl, list = [], closePopup } = props;

  const viewAllClick = () => {
    closePopup();
    router.push(`${VIEW_ALL_NEWS_URL}`);
  };

  return (
    <section className="news-list item-grid sessions-grid">
      <span className="news-list-title">
        News
        <Link href={`${resultsUrl}&tab=news`} onClick={viewAllClick}>
          <a className="view-all">View All</a>
        </Link>
      </span>
      <div className="grid-content news-list-content">
        {list.length > 0 && list.map((item) => <NewsCard key={item.id} {...item} />)}
      </div>
    </section>
  );
};

export default PreviewSearchNewsList;
