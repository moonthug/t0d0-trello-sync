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
    username: process.env.TRELLO_USERNAME,
    t0D0BoardName: process.env.TRELLO_T0D0_BOARDNAME
  });

  trelloSync.setBoardConfigs(config);

  //
  // Fetch boards
  await trelloSync.execute();

  //
  // Sync Boards
  console.timeLog('sync');
  console.info('Sync complete');

  //
  // Extract t0d0's to create

  // const cardsForT0D0Board = [];
  //
  // for (let board of boards) {
  //   const boardConfig = config.find(boardConfig => boardConfig.board === board.name);
  //
  //   console.log(`Syncing board '${board.name}'`);
  //
  //   for (let card of board.cards) {
  //     let result;
  //     try {
  //       result = await boardConfig.isCardAToDo(card);
  //     } catch (e) {
  //       throw e;
  //     }
  //
  //     if (result === true) {
  //       const t0d0Data = boardConfig.transformCardToT0D0(card);
  //     }
  //   }
  // }

  //
  // Create t0d0's and add to t0d0 board

  //
  // Push the t0d0s to trello
  // console.table(moveToT0d0);
};

/**
 *
 */

main().catch(err => console.error(err));
