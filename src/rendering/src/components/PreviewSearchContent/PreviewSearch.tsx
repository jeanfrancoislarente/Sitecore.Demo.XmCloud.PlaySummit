import { useCallback, useRef, useState } from 'react';
import debounce from '../../helpers/Debounce';
import ClickOutside from '../ShopCommon/ClickOutside';
import PreviewSearchContainer from './PreviewSearchContainer';
import SearchInput from './SearchInput';

const PreviewSearch = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [keyphrase, setKeyphrase] = useState('');
  const ref = useRef(null);

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
  ClickOutside([ref], closePopup);

  return (
    <div ref={ref}>
      {open && <PreviewSearchContainer keyphrase={keyphrase} close={closePopup} />}
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
  );
};

export default PreviewSearch;
