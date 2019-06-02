import Card from './card';

export default interface Transformer {

  /**
   *
   */
  todo (card: Card): boolean;

  /**
   *
   */
  inProgress (card: Card): boolean;

  /**
   *
   */
  done (card: Card): boolean;
}
