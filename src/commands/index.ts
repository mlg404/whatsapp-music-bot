import { PREFIX } from '../config';
import play from './play';
import help from './help';

export default {
  [`${PREFIX}play`]: play,
  [`${PREFIX}help`]: help,
};
