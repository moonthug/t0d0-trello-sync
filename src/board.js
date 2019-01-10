import Card from './card';

export default class Board {
  /**
   * @constructor
   * @param {Trello} trello
   * @param {Object} boardData
   */
  constructor(trello, boardData) {
    this.trello = trello;

    this.id = boardData.id;
    this.name = boardData.name;

    this.customFields = [];
    this.lists = [];
    this.cards = [];
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async fetchData() {
    console.info(`Fetch data for board ${this.name}[${this.id}]`);
    this.customFields = await this.fetchCustomFields();
    this.lists = await this.fetchLists();
    this.cards = await this.fetchCards();
  }

  /**
   *
   * @returns {Promise<*>}
   */
  async fetchCustomFields() {
    try {
      const fields = await this.trello.getBoardField(this.id, 'customFields');
      return fields.map(field => {
        return { id: field.id, name: field.name, options: field.options };
      });
    } catch (e) {
      console.error('Could not fetch customFields');
      throw e;
    }
  }

  /**
   *
   * @returns {Promise<*>}
   */
  async fetchLists() {
    try {
      const lists = await this.trello.getBoardField(this.id, 'lists');
      return lists.map(list => {
        return { id: list.id, name: list.name };
      });
    } catch (e) {
      console.error('Could not fetch customFields');
      throw e;
    }
  }

  /**
   *
   * @returns {Promise<Card>}
   */
  async fetchCards() {
    let cards;

    try {
      const cardsData = await this.trello.getBoardField(this.id, 'cards');
      cards = cardsData.map(cardData => {
        return new Card(this.trello, this, cardData);
      });
    } catch (e) {
      console.error('Could not fetch customFields');
      throw e;
    }

    try {
      for (let card of cards) {
        await card.fetchData();
      }
    } catch (e) {
      console.error('Could not fetch card data');
      throw e;
    }

    return cards;
  }
}
