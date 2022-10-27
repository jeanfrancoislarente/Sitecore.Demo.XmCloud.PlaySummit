import Link from 'next/link';
import router from 'next/router';
import SpeakerCard, { SpeakerCardProps } from './SpeakerCard';

export type SpeakerListProps = {
  resultsUrl: string;
  list?: SpeakerCardProps[];
  closePopup: () => void;
};

const VIEW_ALL_SPEAKERS_URL = '/speakers';

const PreviewSearchSpeakerList = (props: SpeakerListProps): JSX.Element => {
  const { resultsUrl, list = [], closePopup } = props;

  const viewAllClick = () => {
    closePopup();
    router.push(`${VIEW_ALL_SPEAKERS_URL}`);
  };

  return (
    <section className="speaker-list item-grid">
      <span className="speaker-list-title">
        Speakers
        <Link href={`${resultsUrl}&tab=speakers`} onClick={viewAllClick}>
          <a className="view-all">View All</a>
        </Link>
      </span>
      <div className="grid-content speaker-list-content">
        {list.length > 0 && list.map((item) => <SpeakerCard key={item.id} {...item} />)}
      </div>
    </section>
  );
};

export default PreviewSearchSpeakerList;
