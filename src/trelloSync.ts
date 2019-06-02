import Trello from '@moonthug/trello';

import Board from './board';
import BoardConfig from './boardConfig';

/**
 *
 */
export default class TrelloSync {

  trello: any;
  options: any;
  boardConfigs: any;
  boards: Array<Board>;

  /**
   *
   * @param options
   */
  constructor (options: any = {}) {
    this.trello = new Trello(options.apiKey, options.apiToken);
    this.options = options;
    this.boards = [];
  }

  /**
   *
   * @param boardConfigs
   */
  public setBoardConfigs (boardConfigs: any): void {
    // Validate with JOI
    this.boardConfigs = boardConfigs;
  }

  /**
   *
   */
  public async execute (): Promise<void> {
    const boards = await this.fetchAllBoards();

    console.table(
      boards.map((board: Board) => {
        return { id: board.id, name: board.name, cards: board.cards.length, isToDo: board.config.isT0d0Board };
      })
    );
  }

  /**
   *
   */
  private async fetchAllBoards (): Promise<Array<Board>> {
    // CACHE THIS FOR LONGER? PASS IN OPTONS TO HTTPCLIENT

    const boardsData: any = await this.trello.getMemberField(
      this.options.username,
      'boards'
    );

    const boards: Array<Board> = boardsData.reduce((boardList: any, board: Board) => {
      const boardConfig: BoardConfig = this.boardConfigs.find(
        (boardConfig: BoardConfig) => boardConfig.boardName === board.name
      );

      if (boardConfig) {
        boardList.push(new Board(this.trello, board, boardConfig));
      }

      return boardList;
    }, []);

    // Fetch all data
    await Promise.all(
      boards.map(board => {
        return board.fetchData();
      })
    );

    return boards;
  }
}
