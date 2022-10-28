import { useEffect, useRef, forwardRef } from 'react';
import useDiscoverQueries from '../../hooks/useDiscoverQueries';
import { DiscoverNews } from '../../interfaces/DiscoverNews';
import { DiscoverResponse } from '../../interfaces/DiscoverResponse';
import { DiscoverSession } from '../../interfaces/DiscoverSession';
import { DiscoverSpeaker } from '../../interfaces/DiscoverSpeaker';
import ClickOutside from '../ShopCommon/ClickOutside';
import PreviewSearchNewsList from './PreviewSearchNewsList';
import PreviewSearchSessionList from './PreviewSearchSessionList';
import PreviewSearchSpeakerList from './PreviewSearchSpeakerList';
import SuggestionList from './SuggestionList';

export type PreviewSearchPopupProps = {
  resultsUrl: string;
  news: DiscoverResponse<DiscoverNews>;
  sessions: DiscoverResponse<DiscoverSession>;
  speakers: DiscoverResponse<DiscoverSpeaker>;
  close?: () => void;
};

export type PreviewSearchContainerProps = {
  keyphrase: string;
  close?: () => void;
};

type Suggestion = {
  [key: string]: any;
};

export const PreviewSearchPopup = forwardRef<HTMLDivElement, PreviewSearchPopupProps>(
  (
    { resultsUrl, news, sessions, speakers, close }: PreviewSearchPopupProps,
    forwardedRef
  ): JSX.Element => {
    const popupRef = useRef(null);
    ClickOutside([popupRef], close);

    const getSuggestions = (
      newsSuggestions: Suggestion = [],
      sessionsSuggestions: Suggestion = [],
      speakersSuggestions: Suggestion = []
    ) => [
      ...(newsSuggestions['content_name_context_aware'] || []),
      ...(sessionsSuggestions['session_name_context_aware'] || []),
      ...(speakersSuggestions['speaker_name_context_aware'] || []),
    ];

    const suggestions = getSuggestions(
        news?.suggestion,
        sessions?.suggestion,
        speakers?.suggestion
      ),
      sessionsAvailable = sessions && sessions.total_item > 0,
      speakersAvailable = speakers && speakers.total_item > 0,
      newsAvailable = news && news.total_item > 0;
    return (
      ((suggestions && suggestions.length > 0) ||
        sessionsAvailable ||
        speakersAvailable ||
        newsAvailable) && (
        <div className={`preview-search-content-container`} ref={forwardedRef}>
          <div className={`preview-search-content`}>
            <div className={`preview-search-content-popup`} ref={popupRef}>
              {suggestions && suggestions.length > 0 && (
                <SuggestionList title={`Do you mean?`} list={suggestions} />
              )}
              {sessionsAvailable && (
                <PreviewSearchSessionList resultsUrl={resultsUrl} list={sessions.content} />
              )}
              {speakersAvailable && (
                <PreviewSearchSpeakerList resultsUrl={resultsUrl} list={speakers.content} />
              )}
              {newsAvailable && (
                <PreviewSearchNewsList resultsUrl={resultsUrl} list={news.content} />
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
    result: [news, sessions, speakers],
  } = useDiscoverQueries<
    [
      DiscoverResponse<DiscoverNews>,
      DiscoverResponse<DiscoverSession>,
      DiscoverResponse<DiscoverSpeaker>
    ]
  >(['content', 'session', 'speaker'], {
    keyphrase,
    limit: 4,
    widgetId: 'rfkid_6',
  });

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
      close={close}
    />
  );
};

export default PreviewSearchContainer;
