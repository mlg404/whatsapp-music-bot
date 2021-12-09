import BaseSearch from './base';
import YTSearch from './YTSearch';

export default class Searcher extends BaseSearch {
  private ytSearch: YTSearch;

  constructor() {
    super();
    this.ytSearch = new YTSearch();
  }

  public async handle(keyword: string): Promise<SearchResponse> {
    return this.ytSearch.find(keyword);
  }
}
