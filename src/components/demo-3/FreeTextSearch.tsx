import { useSearch } from '@contexts/coveo-search';
import { buildSearchBox, SearchBox, SearchBoxState } from '@coveo/headless';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'next-localization';
import { useEffect, useState } from 'react';

const ExampleSearchBox = () => {
  return (
    <input
      className="free-text-search__search-box m-auto"
      placeholder={'This is an example Search Box'}
      type="search"
    ></input>
  );
};

const Default = (props: ComponentProps) => {
  const { engine } = useSearch();
  const [searchBox, setSearchBox] = useState<SearchBox | null>(null);
  const [searchBoxState, setSearchBoxState] = useState<SearchBoxState | null>(null);
  const { sitecoreContext } = useSitecoreContext();

  const { t } = useI18n();
  const styles = `component free-text-search search-filter row ${props?.params?.Styles ?? ''}`;
  const id = props?.params?.RenderingIdentifier;

  let placeholderText = t('search-by-keyword');
  if (!placeholderText || placeholderText.length <= 0) {
    placeholderText = 'Search by keyword';
  }

  const submit = () => {
    searchBox?.submit();
  };

  useEffect(() => {
    if (!engine) {
      return () => null;
    }

    const controller = buildSearchBox(engine);

    setSearchBox(controller);
    const unsubscribe = controller.subscribe(() => setSearchBoxState(controller.state));

    return () => unsubscribe();
  }, [engine]);

  return (
    <div className={styles} id={id}>
      {sitecoreContext.pageEditing && <ExampleSearchBox />}
      {searchBoxState && (
        <form>
          <div>
            <label htmlFor="searchBox" className="form-label">
              Search Box
            </label>
            <input
              className="free-text-search__search-box m-auto form-control"
              value={searchBoxState.value}
              placeholder={placeholderText}
              onSubmit={submit}
              type="search"
              id="searchBox"
              aria-describedby="searchHelp"
              onKeyDown={(e) => (e.code === 'Enter' ? submit() : null)}
              onChange={(e) => searchBox?.updateText(e.target.value)}
            ></input>
            <div id="searchHelp" className="form-text">
              Search Help Box.
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export { Default };
