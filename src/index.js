import Trello from '@moonthug/trello';

import Board from './board';

import config from './config';

import { TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_USERNAME, TRELLO_T0D0_BOARDNAME } from 'babel-dotenv';

const trello = new Trello(TRELLO_API_KEY, TRELLO_TOKEN);

/**
 *
 * @returns {Promise<Array>}
 */
const fetchAllBoards = async () => {
  const boardsData = await trello.getMemberField(TRELLO_USERNAME, 'boards');
  const boards = [];

  for (let boardData of boardsData) {
    const syncer = config.find(sync => sync.board === boardData.name);
    if (!syncer && boardData.name !== TRELLO_T0D0_BOARDNAME) {
      console.log(`Skipping board '${boardData.name}'`);
      continue;
    }

    const board = new Board(trello, boardData);

    try {
      await board.fetchData();
      boards.push(board);
    } catch (e) {
      console.error(`Fetch data for board ${board.name}[${board.id}]`);
      throw e;
    }
  }

  return boards;
};

/**
 *
 * @returns {Promise<void>}
 */
const main = async () => {
  let boards;

  console.time('fetch-boards');
  console.info('Fetching boards...');

  //
  // Fetch Boards

  try {
    boards = await fetchAllBoards();
  } catch (e) {
    console.error('Could not fetch boards', e);
    throw e;
  }

  let t0d0Board = null;
  boards = boards.reduce((newBoards, board) => {
    if (board.name === TRELLO_T0D0_BOARDNAME) {
      t0d0Board = board;
    } else {
      newBoards.push(board);
    }
    return newBoards;
  }, []);

  if (!t0d0Board) {
    throw new Error(
      `Couldn't find t0d0 board '${TRELLO_T0D0_BOARDNAME}' on Trello`
    );
  }

  console.timeLog('fetch-boards');
  console.info('Fetching boards complete');
  console.dir(t0d0Board);
  console.table(
    boards.map(board => {
      return { id: board.id, name: board.name, cards: board.cards.length };
    })
  );


  //
  // Extract t0d0's to create

  const moveToT0d0 = [];
  for (let board of boards) {
    const syncer = config.find(sync => sync.board === board.name);

    console.log(`Syncing board '${board.name}'`);

    for (let card of board.cards) {
      let result;
      try {
        result = await syncer.sync(card);
      } catch (e) {
        throw e;
      }

      if (result === true) {
        moveToT0d0.push(syncer.transform(card));
      }
    }
  }

  //
  // Push the t0d0s to trello
  console.table(moveToT0d0);
};

/**
 *
 */

main().catch(err => console.error(err));
