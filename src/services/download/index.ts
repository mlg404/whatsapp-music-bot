import fs from 'fs';
import BaseDownload from './base';
import YTDownload from './YTDownload';

export default class Downloader extends BaseDownload {
  private ytDownload: YTDownload;

  private musics: string[];

  constructor() {
    super();
    this.ytDownload = new YTDownload();
    this.musics = this.getCachedMusics();
    console.log(this.musics);
  }

  public async handle(videoId: string): Promise<string> {
    if (this.isMusicDownloaded(videoId)) {
      return `downloads/${videoId}.mp3`;
    }

    const result = await this.ytDownload.download(videoId);

    this.musics = [...this.musics, `${videoId}.mp3`];

    return result;
  }

  private isMusicDownloaded(videoId: string): boolean {
    return this.musics.includes(`${videoId}.mp3`);
  }

  protected getCachedMusics(): string[] {
    return fs.readdirSync(`downloads`);
  }
}
