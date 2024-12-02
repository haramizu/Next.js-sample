// This component was generated by @sitecore-search/cli on Mon Dec 02 2024 14:26:32 GMT+0900 (日本標準時)

import type {
  SearchResultsInitialState,
  SearchResultsStoreState,
} from "@sitecore-search/react";
import {
  WidgetDataType,
  useSearchResults,
  widget,
} from "@sitecore-search/react";

import ArticleHorizontalItemCard from "../components/ArticleHorizontalCard";
import Filter from "../components/Filter";
import QueryResultsSummary from "../components/QueryResultsSummary";
import ResultsPerPage from "../components/ResultsPerPage";
import SearchFacets from "../components/SearchFacets";
import SearchPagination from "../components/SearchPagination";
import SortOrder from "../components/SortOrder";
import Spinner from "../components/Spinner";

type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};
type ArticleSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState["sortType"];
  defaultPage?: SearchResultsStoreState["page"];
  defaultItemsPerPage?: SearchResultsStoreState["itemsPerPage"];
  defaultKeyphrase?: SearchResultsStoreState["keyphrase"];
};
type InitialState = SearchResultsInitialState<
  "itemsPerPage" | "keyphrase" | "page" | "sortType"
>;

export const SearchResultsComponent = ({
  defaultSortType = "title_ascending",
  defaultPage = 1,
  defaultKeyphrase = "",
  defaultItemsPerPage = 24,
}: ArticleSearchResultsProps) => {
  const {
    widgetRef,
    actions: { onItemClick },
    state: { sortType, page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: {
        total_item: totalItems = 0,
        sort: { choices: sortChoices = [] } = {},
        facet: facets = [],
        content: articles = [],
      } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white dark:bg-gray-900">
        <Spinner loading />
      </div>
    );
  }
  return (
    <div ref={widgetRef}>
      <div className="flex relative max-w-full px-4 text-black dark:text-gray-100 text-opacity-75">
        {isFetching && (
          <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-30 bg-white dark:bg-gray-900 opacity-50">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40">
              <Spinner loading />
            </div>
          </div>
        )}
        {totalItems > 0 && (
          <>
            <section className="flex flex-col flex-none relative mt-4 mr-8 w-[25%]">
              <Filter />

              <SearchFacets facets={facets} />
            </section>
            <section className="flex flex-col flex-[4_1_0%]">
              {/* Sort Select */}
              <section className="flex justify-between text-xs">
                {totalItems > 0 && (
                  <QueryResultsSummary
                    currentPage={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    totalItemsReturned={articles.length}
                  />
                )}
                <SortOrder options={sortChoices} selected={sortType} />
              </section>

              {/* Results */}
              <div className="w-full">
                {articles.map((a, index) => (
                  <ArticleHorizontalItemCard
                    key={a.id}
                    article={a as ArticleModel}
                    index={index}
                    onItemClick={onItemClick}
                    displayText={true}
                  />
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between text-xs">
                <ResultsPerPage defaultItemsPerPage={defaultItemsPerPage} />
                <SearchPagination currentPage={page} totalPages={totalPages} />
              </div>
            </section>
          </>
        )}
        {totalItems <= 0 && !isFetching && (
          <div className="w-full flex justify-center">
            <h3>0 Results</h3>
          </div>
        )}
      </div>
    </div>
  );
};
const SearchResultsWidget = widget(
  SearchResultsComponent,
  WidgetDataType.SEARCH_RESULTS,
  "content"
);
export default SearchResultsWidget;
