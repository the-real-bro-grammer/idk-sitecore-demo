import { useSearch } from '@contexts/coveo-search';
import { buildFacet, Facet, FacetState } from '@coveo/headless';
import { Field, Item, Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';
import { WrappedField } from 'src/types/wrapped-field';

interface Fields {
  data: {
    datasource: {
      title: Field<string>;
      facet: WrappedField<Item>;
    };
  };
}

type AutomaticSearchFilterProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const EditableEmptyFacetState = () => {
  const { sitecoreContext } = useSitecoreContext();

  if (!sitecoreContext.pageEditing) {
    return null;
  }

  return <div>Make sure to add a facet!</div>;
};

const ExampleSearchResults = (props: AutomaticSearchFilterProps) => {
  return (
    <>
      <div className="row">
        <Text field={props.fields.data.datasource.title} />
      </div>
      <div className="row">
        <ul>
          <li key={1}>
            <label>
              <input type="checkbox"></input>
              This is an example
            </label>
          </li>
        </ul>
      </div>
    </>
  );
};

const Default = (props: AutomaticSearchFilterProps) => {
  const { engine } = useSearch();
  const [facet, setFacet] = useState<Facet | null>(null);
  const [facetState, setFacetState] = useState<FacetState | null>(null);
  const { sitecoreContext } = useSitecoreContext();

  const styles = `component automatic-search-filter search-filter row ${
    props?.params?.Styles ?? ''
  }`;
  const id = props?.params?.RenderingIdentifier;
  const facetField = props.fields.data.datasource.facet.jsonValue?.value;
  const fieldName = facetField?.fields['Facet Name'] as Field<string>;

  if (!fieldName || !fieldName.value?.length) {
    return <EditableEmptyFacetState />;
  }

  useEffect(() => {
    if (!engine) {
      return () => null;
    }

    const controller = buildFacet(engine, {
      options: {
        field: fieldName.value,
        numberOfValues: 10,
      },
    });

    controller.enable();

    setFacet(controller);
    const unsubscribe = controller.subscribe(() => setFacetState(controller.state));

    return () => unsubscribe();
  }, [engine]);

  return (
    <div className={styles} id={id ? id : undefined}>
      {sitecoreContext.pageEditing && <ExampleSearchResults {...props} />}
      {facetState && (
        <>
          <div className="row">
            <Text field={props.fields.data.datasource.title} />
          </div>
          <div className="row">
            <ul>
              {facetState.values.map((v, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={v.state == 'selected'}
                      onChange={() => facet?.toggleSelect(v)}
                    ></input>
                    {v.value}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export { Default };
