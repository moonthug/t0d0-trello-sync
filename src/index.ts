import './env';

import TrelloSync from './trelloSync';
import config from './config';

/**
 *
 * @returns {Promise<void>}
 */
const main = async () => {
  console.time('sync');
  console.info('Starting Sync...');

  const trelloSync = new TrelloSync({
    apiKey: process.env.TRELLO_API_KEY,
    apiToken: process.env.TRELLO_TOKEN,
    username: process.env.TRELLO_USERNAME
  });

  trelloSync.setBoardConfigs(config);

  //
  // Fetch boards
  await trelloSync.execute();

  //
  // Sync Boards
  console.timeLog('sync');
  console.info('Sync complete');
};

/**
 *
 */

main().catch(err => console.error(err));
