import Trello from '@moonthug/trello';

import Card from './card';
import BoardConfig from './boardConfig';

export default class Board {

  trello: Trello;

  id: string;
  name: string;

  customFields: Array<any>;
  lists: Array<any>;
  cards: Array<Card>;

  config: BoardConfig;

  /**
   *
   * @param trello
   * @param boardData
   * @param boardConfig
   */
  constructor (trello: Trello, boardData: any, boardConfig: BoardConfig) {
    this.trello = trello;

    this.id = boardData.id;
    this.name = boardData.name;

    this.config = boardConfig;
  }

  /**
   *
   */
  public async fetchData (): Promise<void> {
    console.info(`Fetch data for board ${this.name} [${this.id}]`);
    this.lists = await this.fetchLists();
    this.customFields = await this.fetchCustomFields();
    this.cards = await this.fetchCards();
  }

  /**
   *
   */
  public async processCards (): Promise<void> {

  }

  /**
   *
   */
  public async fetchLists (): Promise<Array<any>> {
    try {
      const lists = await this.trello.getBoardField(this.id, 'lists');
      return lists.map((list: any) => {
        return { id: list.id, name: list.name };
      });
    } catch (e) {
      console.error('Could not fetch customFields');
      throw e;
    }
  }

  /**
   *
   */
  public async fetchCards (): Promise<Array<Card>> {
    let cards: Array<Card>;

    try {
      const cardsData = await this.trello.getBoardField(this.id, 'cards');
      cards = cardsData.map((cardData: any) => {
        return new Card(this.trello, this, cardData);
      });
    } catch (e) {
      console.error('Could not fetch customFields');
      throw e;
    }

    try {
      for (const card of cards) {
        await card.fetchData();
      }
    } catch (e) {
      console.error('Could not fetch card data');
      throw e;
    }

    return cards;
  }

  /**
   *
   */
  public async fetchCustomFields (): Promise<any> {
    try {
      const fields = await this.trello.getBoardField(this.id, 'customFields');
      return fields.map((field: any) => {
        return { id: field.id, name: field.name, options: field.options };
      });
    } catch (e) {
      console.error('Could not fetch customFields');
      throw e;
    }
  }
}
