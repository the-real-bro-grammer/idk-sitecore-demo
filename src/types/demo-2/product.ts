import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { WrappedField } from '../wrapped-field';

export type Product = {
  productName: WrappedField<string>;
  price: WrappedField<string>;
  image: { jsonValue: ImageField };
};
