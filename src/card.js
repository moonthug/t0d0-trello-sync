export default class Card {
  /**
   *
   * @param {Trello} trello
   * @param {Board} board
   * @param {Object} cardData
   */
  constructor(trello, board, cardData) {
    this.trello = trello;
    this.board = board;
    this.list = board.lists.find(list => list.id === cardData.idList);

    this.id = cardData.id;
    this.name = cardData.name;
    this.due = cardData.due;

    this.customFieldItems = [];
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async fetchData() {
    console.info(`Fetch data for card ${this.name}[${this.id}]`);
    this.customFieldItems = await this.fetchCustomFieldItems();
  }

  /**
   *
   * @returns {Promise<CustomField>}
   */
  async fetchCustomFieldItems() {
    try {
      const fieldItems = await this.trello.getCardField(
        this.id,
        'customFieldItems'
      );
      return fieldItems.map(fieldItem => {
        const customField = this.board.customFields.find(
          customField => customField.id === fieldItem.idCustomField
        );

        if (fieldItem.idValue) {
          fieldItem = customField.options.find(
            option => option.id === fieldItem.idValue
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
