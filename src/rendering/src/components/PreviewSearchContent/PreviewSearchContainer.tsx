import { useEffect, useRef, forwardRef } from 'react';
import useDiscoverQueries from '../../hooks/useDiscoverQueries';
import { DiscoverNews } from '../../interfaces/DiscoverNews';
import { DiscoverResponse, DiscoverResponseBase } from '../../interfaces/DiscoverResponse';
import { DiscoverSession } from '../../interfaces/DiscoverSession';
import { DiscoverSpeaker } from '../../interfaces/DiscoverSpeaker';
import ClickOutside from '../ShopCommon/ClickOutside';
import PreviewSearchNewsList from './PreviewSearchNewsList';
import PreviewSearchSessionList from './PreviewSearchSessionList';
import PreviewSearchSpeakerList from './PreviewSearchSpeakerList';
import SuggestionList from './SuggestionList';

export type PreviewSearchPopupProps = {
  resultsUrl: string;
  close?: () => void;
  news: DiscoverResponse<DiscoverNews>;
  sessions: DiscoverResponse<DiscoverSession>;
  speakers: DiscoverResponse<DiscoverSpeaker>;
  suggestions: DiscoverResponseBase;
};

export type PreviewSearchContainerProps = {
  keyphrase: string;
  close?: () => void;
};

export const PreviewSearchPopup = forwardRef<HTMLDivElement, PreviewSearchPopupProps>(
  (
    { close, resultsUrl, news, sessions, speakers, suggestions }: PreviewSearchPopupProps,
    forwardedRef
  ): JSX.Element => {
    const suggestionsAvailable = suggestions && suggestions.total_item > 0, // TODO: Review suggestions
      sessionsAvailable = sessions && sessions.total_item > 0,
      speakersAvailable = speakers && speakers.total_item > 0,
      newsAvailable = news && news.total_item > 0;
    return (
      (suggestionsAvailable || sessionsAvailable || speakersAvailable || newsAvailable) && (
        <div className={`preview-search-content-container`} ref={forwardedRef}>
          <div className={`preview-search-content`}>
            <div className={`preview-search-content-popup`}>
              {suggestionsAvailable && (
                <SuggestionList
                  title={`Do you mean?`}
                  // list={suggestions.content}
                  closePopup={close}
                />
              )}
              {sessionsAvailable && (
                <PreviewSearchSessionList
                  resultsUrl={resultsUrl}
                  list={sessions.content}
                  closePopup={close}
                />
              )}
              {speakersAvailable && (
                <PreviewSearchSpeakerList
                  resultsUrl={resultsUrl}
                  list={speakers.content}
                  closePopup={close}
                />
              )}
              {newsAvailable && (
                <PreviewSearchNewsList
                  resultsUrl={resultsUrl}
                  list={news.content}
                  closePopup={close}
                />
              )}
            </div>
          </div>
        </div>
      )
    );
  }
);
PreviewSearchPopup.displayName = 'PreviewSearchPopup';

const PreviewSearchContainer = ({ keyphrase, close }: PreviewSearchContainerProps): JSX.Element => {
  const {
    isLoading,
    result: [news, sessions, speakers, suggestions],
  } = useDiscoverQueries<
    [
      DiscoverResponse<DiscoverNews>,
      DiscoverResponse<DiscoverSession>,
      DiscoverResponse<DiscoverSpeaker>,
      DiscoverResponseBase
    ]
  >(['content', 'session', 'speaker', 'free'], {
    keyphrase,
    limit: 4,
    widgetId: 'rfkid_6',
  });

  const ref = useRef(null);
  ClickOutside([ref], close);
  const keyphraseRef = useRef<string>();
  useEffect(() => {
    if (!isLoading) {
      keyphraseRef.current = keyphrase;
    }
  }, [isLoading, keyphrase]);

  return (
    <PreviewSearchPopup
      // we want to generate the correct search results url based on the current response keyphrase to avoid unnecessary re-renders
      resultsUrl={`/search?q=${keyphraseRef.current}`}
      news={news}
      sessions={sessions}
      speakers={speakers}
      suggestions={suggestions}
      close={close}
    />
  );
};

export default PreviewSearchContainer;
