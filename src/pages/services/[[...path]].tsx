import {
  ComponentPropsContext,
  SitecoreContext,
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { handleEditorFastRefresh } from '@sitecore-jss/sitecore-jss-nextjs/utils';
import { GraphQLClient } from 'lib/graphql/client';
import { SitecorePageProps } from 'lib/page-props';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { GetStaticPaths, GetStaticProps } from 'next';
import { JSX, useEffect } from 'react';
import Layout from 'src/Layout';
import NotFound from 'src/NotFound';
import { componentBuilder } from 'temp/componentBuilder';

const SitecorePage = ({
  notFound,
  componentProps,
  layoutData,
  headLinks,
}: SitecorePageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore editors do not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (notFound || !layoutData.sitecore.route) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  const isEditing = layoutData.sitecore.context.pageEditing;

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext
        componentFactory={componentBuilder.getComponentFactory({ isEditing })}
        layoutData={layoutData}
      >
        <Layout layoutData={layoutData} headLinks={headLinks} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

export const getStaticPaths: GetStaticPaths = async (_context) => {
  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';
  paths = [];
  fallback = 'blocking';
  return {
    paths,
    fallback,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  let props: SitecorePageProps;

  if (context.params) {
    context.params.requestPath = context.params.path;
    context.params.path = [`services/,-w-,`];
  }

  const bucketId: string = '{00000000-0000-0000-0000-000000000000}';
  const itemName = context?.params?.requestPath?.[0] || '';

  const result = await GraphQLClient.GetWildcardPage(bucketId, itemName);
  if (!result || !result.items) {
    props = await sitecorePagePropsFactory.create({
      ...context,
      params: { ...context.params },
    });
  } else {
    props = await sitecorePagePropsFactory.create({
      ...context,
      params: { ...context.params, path: result.items[0]?.url?.path?.toLowerCase() },
    });
  }

  return {
    props,
  };
};

export default SitecorePage;
