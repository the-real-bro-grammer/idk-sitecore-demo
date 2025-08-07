import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

export type WrappedField<T> = {
  jsonValue: Field<T>;
};
