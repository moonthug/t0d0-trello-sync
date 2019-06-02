import BoardConfig from './boardConfig';
import Transformer from './transformer';

export default class TicketBoardConfig implements BoardConfig {
  boardName: string;
  isT0d0Board: boolean = false;
  transformer: Transformer;

  constructor (name: string, transformer: Transformer) {
    this.boardName = name;
    this.transformer = transformer;
  }
}
