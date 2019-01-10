export default [
  {
    board: 'Beer',
    sync: card => {
      if (card.due) {
        const dueDate = new Date(card.due);
        return (
          dueDate.getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000
        );
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
