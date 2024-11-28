// This component was generated by @sitecore-search/cli on Thu Nov 28 2024 17:12:49 GMT+0900 (日本標準時)

import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import type { PreviewSearchInitialState } from '@sitecore-search/react';
import { WidgetDataType, usePreviewSearch, widget } from '@sitecore-search/react';
import { ArticleCard, Presence, PreviewSearch } from '@sitecore-search/ui';

import Spinner from '../components/Spinner';

const DEFAULT_IMG_URL = 'https://placehold.co/500x300?text=No%20Image';

type ArticleModel = {
  id: string;
  name?: string;
  title?: string;
  image_url: string;
  url: string;
  source_id?: string;
};

type InitialState = PreviewSearchInitialState<'itemsPerPage'>;

export const PreviewSearchBasicComponent = ({ defaultItemsPerPage = 6 }) => {
  const {
    widgetRef,
    actions: { onItemClick, onKeyphraseChange },
    queryResult,
    queryResult: { isFetching, isLoading },
  } = usePreviewSearch<ArticleModel, InitialState>({
    state: {
      itemsPerPage: defaultItemsPerPage,
    },
  });

  const loading = isLoading || isFetching;
  const keyphraseHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      onKeyphraseChange({ keyphrase: target.value });
    },
    [onKeyphraseChange],
  );
  return (
    <PreviewSearch.Root>
      <PreviewSearch.Input
        className="w-[800px] box-border py-2 px-2 focus:outline-solid focus:outline-1 focus:outline-gray-500 border-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
        onChange={keyphraseHandler}
        autoComplete="off"
        placeholder="Type to search..."
      />
      <PreviewSearch.Content
        ref={widgetRef}
        className="flex justify-center pt-0 h-[400px] shadow-[2px_5px_5px_5px_rgba(0,0,0,0.3)] transition-opacity	w-[var(--radix-popover-trigger-width)] bg-gray-100 dark:bg-gray-700"
      >
        <Spinner loading={loading} />

        <Presence present={!loading}>
          <>
            <PreviewSearch.Results defaultQueryResult={queryResult}>
              {({ isFetching: loading, data: { content: articles = [] } = {} }) => (
                <PreviewSearch.Items
                  data-loading={loading}
                  className="flex flex-[3] bg-white dark:bg-gray-700 overflow-y-auto data-[loading=false]:grid data-[loading=false]:list-none data-[loading=false]:m-0 data-[loading=false]:p-2 data-[loading=false]:gap-3 data-[loading=false]:grid-cols-3"
                >
                  <Spinner loading={loading} />
                  {!loading &&
                    articles.map((article, index) => (
                      <PreviewSearch.Item key={article.id} asChild>
                        <PreviewSearch.ItemLink
                          href={article.url}
                          onClick={(e) => {
                            onItemClick({ id: article.id, index, sourceId: article.source_id });
                            // add redirection or any action
                          }}
                          className="flex box-border no-underline w-full text-black focus:shadow-md"
                        >
                          <ArticleCard.Root className="w-full shadow-[2px_2px_4px_rgba(0,0,0,0.3)] p-2 cursor-pointer block border-transparent border-solid border text-center focus-within:shadow-[2px_2px_4px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.8)] text-gray-900 dark:text-gray-100">
                            <div className="m-auto mb-[10px] relative h-[6em] flex justify-center items-center overflow-hidden">
                              <ArticleCard.Image
                                src={article.image_url || DEFAULT_IMG_URL}
                                className="block w-auto max-w-full h-auto max-h-full"
                              />
                            </div>
                            <ArticleCard.Title className="max-h-[2rem] overflow-hidden m-0 mb-2 font-bold text-xs">
                              {article.name || article.title}
                            </ArticleCard.Title>
                          </ArticleCard.Root>
                        </PreviewSearch.ItemLink>
                      </PreviewSearch.Item>
                    ))}
                </PreviewSearch.Items>
              )}
            </PreviewSearch.Results>
          </>
        </Presence>
      </PreviewSearch.Content>
    </PreviewSearch.Root>
  );
};
const PreviewSearchBasicWidget = widget(PreviewSearchBasicComponent, WidgetDataType.PREVIEW_SEARCH, 'content');
export default PreviewSearchBasicWidget;
