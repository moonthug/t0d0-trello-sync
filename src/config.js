import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

export default [
  {
    board: 'Beer',
    sync: card => {
      if (card.due) {
        const dueDate = moment(card.due);
        return moment()
          .range(moment(0), moment().add(7, 'd'))
          .contains(dueDate);
      }
      return false;
    }
  },
  {
    board: 'Garden',
    sync: card => {
      return card.list.name === 'To Do';
    },
    createT0d0: card => {
      return {
        name: card.name
      };
    }
  }
];
