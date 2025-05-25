import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '../../mdx-components';
import type { Metadata } from 'next';
import type { ComponentType, ReactNode, ReactElement } from 'react';

interface PageParams {
  mdxPath: string[];
}
interface GenerateMetadataProps {
  params: Promise<PageParams>;
}
interface PageComponentProps {
  params: Promise<PageParams>;
}
interface TocEntry {
  id: string;
  value: string;
  depth: number;
}
interface ImportPageData {
  default: ComponentType<any>;
  toc?: TocEntry[];
  metadata: Metadata;
}

export const generateStaticParams = generateStaticParamsFor('mdxPath');

export async function generateMetadata(props: GenerateMetadataProps): Promise<Metadata> {
  const params = await props.params;
  const { metadata } = (await importPage(params.mdxPath)) as ImportPageData;
  return metadata;
}

const Wrapper: ComponentType<{ toc?: TocEntry[]; metadata: Metadata; children: ReactNode }> = getMDXComponents({}).wrapper;

export default async function Page(props: PageComponentProps): Promise<ReactElement> {
  const params = await props.params;
  const result = (await importPage(params.mdxPath)) as ImportPageData;
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}