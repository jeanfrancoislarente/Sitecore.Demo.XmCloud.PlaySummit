import Link from 'next/link';
import router from 'next/router';
import SessionCard, { SessionCardProps } from './SessionCard';

export type SessionListProps = {
  resultsUrl: string;
  list?: SessionCardProps[];
  closePopup: () => void;
};

const VIEW_ALL_SESSIONS_URL = '/sessions';

const PreviewSearchSessionList = (props: SessionListProps): JSX.Element => {
  const { resultsUrl, list = [], closePopup } = props;

  const viewAllClick = () => {
    closePopup();
    router.push(`${VIEW_ALL_SESSIONS_URL}`);
  };

  return (
    <section className="session-list item-grid sessions-grid">
      <span className="session-list-title">
        Sessions
        <Link href={`${resultsUrl}&tab=sessions`} onClick={viewAllClick}>
          <a className="view-all">View All</a>
        </Link>
      </span>
      <div className="grid-content session-list-content">
        {list.length > 0 && list.map((item) => <SessionCard key={item.id} {...item} />)}
      </div>
    </section>
  );
};

export default PreviewSearchSessionList;
