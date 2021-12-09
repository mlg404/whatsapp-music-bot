import qrcode from 'qrcode-terminal';
import { Client, MessageMedia } from 'whatsapp-web.js';
import langs from './language';
import Downloader from './services/download';
import Searcher from './services/search';

const text = langs.en;

const client = new Client({
  puppeteer: { headless: true, args: ['--no-sandbox'] },
  clientId: 'example',
});

const downloader = new Downloader();
const searcher = new Searcher();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log(text.MESSAGE_CONNECTED);
});

client.on('message_create', async message => {
  console.log(message.body);

  if (message.body.startsWith(text.COMMAND_PLAY)) {
    try {
      const keyword = message.body.split('!play ')[1];
      const { title, videoId } = await searcher.handle(keyword);
      message.reply(`${text.MESSAGE_FOUNDED} "${title}"`);

      message.reply(text.MESSAGE_DOWNLOAD_STARTED);

      const music = await downloader.handle(videoId);

      const media = MessageMedia.fromFilePath(music);
      return message.reply(media);
    } catch (error) {
      console.log(error);
      return message.reply(text.MESSAGE_ERROR);
    }
  }
});

client.initialize();
