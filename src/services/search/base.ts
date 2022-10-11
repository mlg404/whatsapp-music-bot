export default abstract class BaseSearch {
  abstract handle(keyword: string): Promise<SearchResponse>;
}
