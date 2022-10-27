import Link from 'next/link';

export type Suggestion = {
  id?: string;
  text?: string;
  url?: string;
  closePopup: () => void;
};

export type SuggestionList = {
  title?: string;
  list?: Suggestion[];
  closePopup: () => void;
};

const Suggestion = (props: Suggestion): JSX.Element => {
  const { url, text, closePopup } = props;
  return (
    <Link href={url} onClick={closePopup}>
      <a className="suggestion-item">
        <span>{text}</span>
      </a>
    </Link>
  );
};

const SuggestionList = (props: SuggestionList): JSX.Element => {
  const { title, list = [], closePopup } = props;

  return (
    <section className="suggestion-list">
      <span className="suggestion-list-title">{title}</span>
      <div className="suggestion-container">
        {list.length > 0 && list.map((item) => (
            <Suggestion
              key={item.id}
              {...item}
              url={`/search?q=${item.text}`}
              closePopup={closePopup}
            />
          ))}
      </div>
    </section>
  );
};

export default SuggestionList;
