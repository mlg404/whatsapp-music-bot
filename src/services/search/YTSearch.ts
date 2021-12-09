import { Options, search, VideoSearchResult } from 'yt-search';
import { MAX_DURATION } from '../../config';

export default class YTSearch {
  private pageStart = 1;

  private pageEnd = 1;

  public async find(keyword: string): Promise<SearchResponse> {
    const options = this.generateOptions(keyword);

    const { videos } = await search(options);

    const { seconds, title, videoId, url } = await this.getFirstValid(videos);
    return {
      seconds,
      title,
      videoId,
      url,
    };
  }

  private generateOptions(query: string): Options {
    return {
      query,
      pageStart: this.pageStart,
      pageEnd: this.pageEnd,
    };
  }

  private getFirstValid(videos: VideoSearchResult[]): VideoSearchResult {
    return videos[0].seconds <= MAX_DURATION
      ? videos[0]
      : this.getFirstValid(videos.slice(1));
  }
}
