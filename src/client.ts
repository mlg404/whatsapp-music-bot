import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

import text from './language';
import { LANGUAGE } from './config';

const client = new Client({
  puppeteer: { headless: true, args: ['--no-sandbox'] },
  authStrategy: new LocalAuth(),
});
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log(text[LANGUAGE].CONNECTED);
});

export default client;
