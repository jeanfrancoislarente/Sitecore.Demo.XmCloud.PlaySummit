import useDiscoverQueries from '../../hooks/useDiscoverQueries';
import { DiscoverNews } from '../../interfaces/DiscoverNews';
import { DiscoverResponse } from '../../interfaces/DiscoverResponse';
import { DiscoverSession } from '../../interfaces/DiscoverSession';
import { DiscoverSpeaker } from '../../interfaces/DiscoverSpeaker';
import PreviewSearchNewsList from './PreviewSearchNewsList';
import PreviewSearchSessionList from './PreviewSearchSessionList';
import PreviewSearchSpeakerList from './PreviewSearchSpeakerList';
import SuggestionList from './SuggestionList';

export type PreviewSearchContainerProps = {
  keyphrase?: string;
  closePopup?: () => void;
};

const PreviewSearchContainer = ({
  keyphrase,
  closePopup,
}: PreviewSearchContainerProps): JSX.Element => {
  const {
    result: [news, sessions, speakers, suggestions],
  } = useDiscoverQueries<
    [
      DiscoverResponse<DiscoverNews>,
      DiscoverResponse<DiscoverSession>,
      DiscoverResponse<DiscoverSpeaker>,
      DiscoverResponse<never>
    ]
  >(['content', 'session', 'speaker', 'free'], {
    keyphrase,
    limit: 4,
    widgetId: 'rfkid_6',
  });

  const suggestionsAvailable = false, // suggestions && suggestions.content.length > 0, // TODO: Review suggestions
    sessionsAvailable = sessions && sessions.content.length > 0,
    speakersAvailable = speakers && speakers.content.length > 0,
    newsAvailable = news && news.content.length > 0;

  return (
    (suggestionsAvailable || sessionsAvailable || speakersAvailable || newsAvailable) && (
      <div className="preview-search-content-popup">
        {suggestionsAvailable && (
          <SuggestionList title="Do you mean?" list={suggestions.content} closePopup={closePopup} />
        )}
        {sessionsAvailable && (
          <PreviewSearchSessionList
            title="Sessions"
            list={sessions.content}
            closePopup={closePopup}
          />
        )}
        {speakersAvailable && (
          <PreviewSearchSpeakerList
            title="Speakers"
            list={speakers.content}
            closePopup={closePopup}
          />
        )}
        {newsAvailable && (
          <PreviewSearchNewsList title="News" list={news.content} closePopup={closePopup} />
        )}
      </div>
    )
  );
};

export default PreviewSearchContainer;
