import {
  ComponentParams,
  ComponentRendering,
  Field,
  Placeholder,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
}

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

const RenderBody = (props: ComponentProps & { placeholderName: string }) => {
  const styles = `component two-column ${props?.params?.Styles ?? ''}`.trimEnd();
  const id = props.params.RenderingIdentifier;
  const phKey = `${props.placeholderName}-two-column-${props?.params?.DynamicPlaceholderId}`;

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        {props.fields?.Title && <Text field={props.fields.Title} />}
        <div className="placeholder-wrapper row">
          <div className="col-6">
            <Placeholder name={`column1-${phKey}`} rendering={props.rendering} />
          </div>
          <div className="col-6">
            <Placeholder name={`column2-${phKey}`} rendering={props.rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = (props: ComponentProps) => {
  return <RenderBody {...props} placeholderName="default" />;
};

export const Homepage = (props: ComponentProps) => {
  return <RenderBody {...props} placeholderName="homepage" />;
};

export const Blog = (props: ComponentProps) => {
  return <RenderBody {...props} placeholderName="blog" />;
};

