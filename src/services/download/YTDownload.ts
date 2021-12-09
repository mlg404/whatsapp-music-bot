import ytdl from 'ytdl-core';
import fs from 'fs';
import FFMPEG from 'ffmpeg';
import { DOWNLOAD_PATH } from '../../config';

export default class YTDownload {
  public async download(videoId: string): Promise<string> {
    const videoPath = `${DOWNLOAD_PATH}/${videoId}.mp4`;
    const audio = ytdl(`https://www.youtube.com/watch?v=${videoId}`, {
      quality: 'lowestaudio',
    })
      // FFF: Feature For Future
      // .on('progress', (_, downloaded, total) => {
      //   console.log(downloaded, total);
      // })
      .pipe(fs.createWriteStream(videoPath));

    const downloadEnd = await new Promise(resolve => {
      audio.on('finish', () => resolve(true));
      audio.on('error', () => resolve(false));
    });

    if (!downloadEnd) {
      // oh no i can't download this shit 😵️
    }

    return this.extractMp3FromMp4(videoPath);
  }

  private async extractMp3FromMp4(videoPath: string): Promise<string> {
    const audioPath = videoPath.split('.')[0];
    const video = await new FFMPEG(videoPath);
    const result = await video.fnExtractSoundToMP3(`${audioPath}.mp3`);

    fs.unlinkSync(`${audioPath}.mp4`);

    return result;
  }
}
