import client from './client';
import commands from './commands';
import { PREFIX } from './config';

const allCommands = ["play", "help"];

client.initialize();

client.on('message_create', async message => {
  if (!message.body.startsWith(PREFIX)) return;

  const [command, ...rest] = message.body.split(' ');
  const content = rest.join(' ');
  
  if (!allCommands.includes(command.substring(1))) return;

  commands[command].run(message, content);
});
