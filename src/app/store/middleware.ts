import { cardsMiddleware } from './cards/middleware';
import { diceMiddleware } from './dice/middleware';

// Any middleware we create will be added here
export default [diceMiddleware, cardsMiddleware];
