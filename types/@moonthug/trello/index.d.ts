// Type definitions for @moonthug/trello
// Project: t0d0-trello-sync
// Definitions by: github@polyglot.rodeo

export = Trello;

declare class Trello {
  constructor (apiKey: string, apiToken: string);
  getBoardField (id: string, field: string): Array<any>;
  getCardField (id: string, field: string): Array<any>;
  getMemberField (id: string, field: string): Array<any>;
}
