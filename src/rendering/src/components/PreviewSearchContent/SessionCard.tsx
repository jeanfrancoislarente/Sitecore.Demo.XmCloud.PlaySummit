import { faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { getAbsoluteUrlPath } from '../../helpers/DiscoverHelper';

export type SessionCardProps = {
  id: string;
  image_url: string;
  name: string;
  description: string;
  url: string;
  days: string[];
  speakers: string[];
  time_slots: string[];
};

const SessionCard = (props: SessionCardProps): JSX.Element => {
  const { image_url, name, url, days = [], speakers = [], time_slots = [] } = props;

  const date = days && days.length > 0 && time_slots.length > 0 && (
    <p className="session-info">
      <span>
        <FontAwesomeIcon className="icon" icon={faCalendar} />
      </span>
      {`${days.join(' - ')} at ${time_slots[0]}`}
    </p>
  );

  const speaker = speakers && speakers.length > 0 && (
    <p className="session-info">
      <span>
        <FontAwesomeIcon className="icon" icon={faUser} />
      </span>
      {speakers.join(' - ')}
    </p>
  );

  return (
    <Link href={getAbsoluteUrlPath(url)}>
      <a className="grid-item">
        <div className="image-hover-zoom" style={{ backgroundImage: `url(${image_url})` }}></div>
        <div className="item-details item-details-left">
          <div className="item-title">{name}</div>
          {speaker}
          {date}
        </div>
      </a>
    </Link>
  );
};

export default SessionCard;
