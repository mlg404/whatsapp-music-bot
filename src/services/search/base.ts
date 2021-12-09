export default abstract class BaseSearch {
  abstract handle(videoUrl: string): Promise<SearchResponse>;
}
