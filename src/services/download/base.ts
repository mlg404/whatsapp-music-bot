export default abstract class BaseDownload {
  abstract handle(videoId: string): Promise<string>;
}
