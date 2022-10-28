export type Suggestion = {
  id?: string;
  text?: string;
  freq?: string;
  url?: string;
};

export type SuggestionList = {
  title?: string;
  list?: Suggestion[];
};

const Suggestion = (props: Suggestion): JSX.Element => {
  const { url, text } = props;
  return (
    <a href={url} className="suggestion-item">
      <span>{text}</span>
    </a>
  );
};

const SuggestionList = (props: SuggestionList): JSX.Element => {
  const { title, list = [] } = props;

  return (
    <section className="suggestion-list">
      <span className="suggestion-list-title">{title}</span>
      <div className="suggestion-container">
        {list.map((item, index) => (
          <Suggestion key={`${index}_${item.freq}`} {...item} url={`/search?q=${item.text}`} />
        ))}
      </div>
    </section>
  );
};

export default SuggestionList;
