import client from './client';
import commands from './commands';
import { PREFIX } from './config';

client.initialize();

client.on('message_create', async message => {
  if (!message.body.startsWith(PREFIX)) return;

  const [command, ...rest] = message.body.split(' ');
  const content = rest.join(' ');

  commands[command].run(message, content);
});
