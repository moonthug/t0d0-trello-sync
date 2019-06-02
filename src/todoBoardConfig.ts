import BoardConfig from './boardConfig';

export default class T0d0BoardConfig implements BoardConfig {
  boardName: string;
  isT0d0Board: boolean = true;

  /**
   *
   * @param boardName
   */
  constructor (boardName: string) {
    this.boardName = boardName;
  }
}
