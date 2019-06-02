import Trello from '@moonthug/trello';

import Board from './board';

export default class Card {

  trello: Trello;
  board: Board;
  list: Array<any>;

  id: string;
  name: string;
  due: number;

  customFieldItems: Array<any>;

  /**
   *
   * @param trello
   * @param board
   * @param cardData
   */
  constructor (trello: Trello, board: Board, cardData: any) {
    this.trello = trello;
    this.board = board;
    this.list = board.lists.find(list => list.id === cardData.idList);

    this.id = cardData.id;
    this.name = cardData.name;
    this.due = cardData.due;
  }

  /**
   *
   * @returns {Promise<void>}
   */
  public async fetchData (): Promise<void> {
    console.info(`Fetch data for card ${this.name} [${this.id}]`);
    this.customFieldItems = await this.fetchCustomFieldItems();
  }

  /**
   *
   */
  public async fetchCustomFieldItems (): Promise<Array<any>> {
    try {
      const fieldItems: Array<any> = await this.trello.getCardField(
        this.id,
        'customFieldItems'
      );
      return fieldItems.map((fieldItem: any) => {
        const customField = this.board.customFields.find(
          customField => customField.id === fieldItem.idCustomField
        );

        if (fieldItem.idValue) {
          fieldItem = customField.options.find(
            (option: any) => option.id === fieldItem.idValue
          );
        }

        return { customField, fieldItem };
      });
    } catch (e) {
      console.error('Could not fetch customFieldItems');
      throw e;
    }
  }
}
