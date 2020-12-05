import fs from 'fs';
import path from 'path';
import yts from 'yt-search';
import qrcode from 'qrcode-terminal';
import DownloadYTFile from 'yt-dl-playlist';
import { Client, MessageMedia } from 'whatsapp-web.js';
import langs from './language';

interface DownloadStatus {
  downloading?: boolean;
  showProgress: boolean;
}
const text = langs.en;
const client = new Client({});

const downloadStatus: DownloadStatus = { showProgress: false };
const downloadedMusics: string[] = [];
const downloadPath = path.resolve(__dirname, '..', 'downloads');
const ffmpegPath = '/usr/bin/ffmpeg'; // default linux
// const ffmpegPath = 'C:\ffmpeg\bin\ffmpeg.exe'; //default windows

const downloader = new DownloadYTFile({
  outputPath: downloadPath,
  ffmpegPath,
  /**
   * For some reason, parallel downloads mades the bot crash
   */
  maxParallelDownload: 1,
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log(text.MESSAGE_CONNECTED);
  await fs.readdir(downloadPath, (err, itens) => {
    if (itens) {
      itens.map(item => downloadedMusics.push(item));
    }
  });
  downloadStatus.downloading = false;
});

client.on('message_create', async message => {
  /**
   * WIP: list all already download musics
   * only showing id's, right now
   */
  if (message.body.startsWith(text.COMMAND_MUSICS) && message.fromMe) {
    console.log(downloadedMusics);
    if (downloadedMusics.length > 0) {
      return message.reply(downloadedMusics.join(', '));
    }
    return message.reply(text.MESSAGE_NO_DOWNLOADED_MUSICS);
  }

  if (message.body.startsWith(text.COMMAND_PLAY)) {
    const searchOptions = {
      query: message.body.split(text.COMMAND_PLAY)[1],
      pageStart: 1,
      pageEnd: 3,
    };

    try {
      const { videos } = await yts(searchOptions);

      if (videos.length === 0) {
        return message.reply(text.MESSAGE_NOT_FOUND);
      }

      const { videoId, title, duration } = videos[0];

      if (downloadedMusics.includes(`${videoId}.mp3`)) {
        const media = MessageMedia.fromFilePath(
          path.resolve(downloadPath, `${videoId}.mp3`),
        );

        return message.reply(media);
      }

      if (duration.seconds >= 900) {
        return message.reply(text.MESSAGE_TOO_LARGE);
      }

      if (downloadStatus.downloading) {
        return message.reply(text.MESSAGE_WAIT_QUEUE);
      }

      downloadStatus.downloading = true;
      message.reply(text.MESSAGE_DOWNLOAD_STARTED);

      if (downloadStatus.showProgress) {
        downloader.on('progress', (fileInfo: any) => {
          const totalTime = fileInfo.ref.duration;
          const atualTime = fileInfo.progress.timemark;
          const atualSeconds =
            Number(atualTime.split(':')[1] * 60) +
            Number(atualTime.split(':')[2]);
          const percentDownload = (atualSeconds * 100) / totalTime;
          client.sendMessage(
            message.to,
            `Downloading: ${percentDownload.toFixed(0)}%`,
          );
        });
      }

      const download = await downloader.download(videoId, `${videoId}.mp3`);
      if (!download) {
        return message.reply(text.MESSAGE_DOWNLOAD_ERROR);
      }

      downloader.removeAllListeners(['progress']);
      downloadStatus.downloading = false;

      const media = MessageMedia.fromFilePath(
        path.resolve(downloadPath, `${videoId}.mp3`),
      );
      downloadedMusics.push(videoId);
      return message.reply(media);
    } catch (error) {
      console.log(error);
      return message.reply(text.MESSAGE_ERROR);
    }
  }
});

client.initialize();
