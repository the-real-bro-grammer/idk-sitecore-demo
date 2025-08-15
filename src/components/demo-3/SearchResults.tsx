import { useSearch } from '@contexts/coveo-search';
import { buildResultList, ResultList, ResultListState } from '@coveo/headless';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';

interface Fields {
  data: {
    datasource: {};
  };
}

type SearchResultsProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const Default = (props: SearchResultsProps) => {
  const { engine, ResultTemplate, fieldsToInclude } = useSearch();
  const [resultList, setResultList] = useState<ResultList | null>(null);
  const [resultListState, setResultListState] = useState<ResultListState | null>(null);
  const { sitecoreContext } = useSitecoreContext();

  const containerStyles = `component search-results row ${props?.params?.Styles ?? ''}`.trimEnd();
  const id = props?.params?.RenderingIdentifier;

  useEffect(() => {
    if (!engine) {
      return () => null;
    }

    const controller = buildResultList(engine, {
      options: {
        fieldsToInclude,
      },
    });

    setResultList(controller);
    engine.executeFirstSearch();

    const unsubscribe = controller.subscribe(() => setResultListState(controller.state));

    return () => unsubscribe();
  }, [engine]);

  return (
    <div className={containerStyles} id={id}>
      <div className="row">Results: {resultListState?.results.length ?? 0}</div>
      {sitecoreContext.pageEditing && ResultTemplate && <ResultTemplate />}
      {resultListState &&
        resultListState.results.map((result, index) => {
          return ResultTemplate && <ResultTemplate key={index} result={result} />;
        })}
      {resultListState && resultListState.moreResultsAvailable && (
        <div className="row">
          <button onClick={() => resultList?.fetchMoreResults()}>Load More +</button>
        </div>
      )}
    </div>
  );
};

export { Default };
