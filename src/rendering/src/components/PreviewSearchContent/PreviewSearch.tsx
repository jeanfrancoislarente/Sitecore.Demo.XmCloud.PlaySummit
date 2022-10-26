import { useCallback, useRef, useState } from 'react';
import debounce from '../../helpers/Debounce';
import { DiscoverNews } from '../../interfaces/DiscoverNews';
import { DiscoverSession } from '../../interfaces/DiscoverSession';
import { DiscoverSpeaker } from '../../interfaces/DiscoverSpeaker';
import ClickOutside from '../ShopCommon/ClickOutside';
import PreviewSearchContainer from './PreviewSearchContainer';
import SearchInput from './SearchInput';

export type Result = {
  title?: string;
  list: unknown[];
};

export type PreviewSearchProps = {
  sessions: DiscoverSession[];
  speakers: DiscoverSpeaker[];
  news: DiscoverNews[];
  suggestions: Result;
};

const PreviewSearch = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [keyphrase, setKeyphrase] = useState('');
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  const changeKeyphrase: (text: string) => void = debounce(
    (text) => {
      if (text !== '') setKeyphrase(text);
    },
    500,
    null
  );

  const onFocus = useCallback(
    (keyphrase: string) => {
      changeKeyphrase(keyphrase);
    },
    [changeKeyphrase]
  );

  const closePopup = useCallback(() => setOpen(false), []);
  ClickOutside([popupRef, inputRef], closePopup);

  return (
    <div>
      <div className="preview-search-content-container">
        <div className="preview-search-content" ref={popupRef}>
          {open && <PreviewSearchContainer keyphrase={keyphrase} closePopup={closePopup} />}
        </div>
      </div>
      <div ref={inputRef}>
        <SearchInput
          placeholder="Search content"
          redirectUrl="search"
          keyphrase={keyphrase}
          setSearchString={changeKeyphrase}
          onFocus={onFocus}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
};

export default PreviewSearch;
