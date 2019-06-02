import Card from './card';
import BoardConfig from './boardConfig';
import T0d0BoardConfig from './todoBoardConfig';
import TicketBoardConfig from './ticketBoardConfig';

const config: Array<BoardConfig> = [
  //
  // t0d0
  new T0d0BoardConfig('t0d0'),

  //
  // Beer
  new TicketBoardConfig('Beer', {
    todo: (card: Card) => {
      if (card.due) {
        const dueDate = new Date(card.due);
        return (
          dueDate.getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
        );
      }
      return false;
    },
    inProgress: (card: Card) => {
      return false;
    },
    done: (card: Card) => {
      return false;
    }
  })
  // {
  //   boardName: 'Garden',
  //   isCardAT0D0: (card: any) => {
  //     return card.list.name === 'To Do';
  //   },
  //   transformCardToT0D0: (card: any) => {
  //     return {
  //       name: card.name
  //     };
  //   }
  // }
];

export default config;
