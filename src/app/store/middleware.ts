import { diceMiddleware } from './dice/middleware';
import { cardsMiddleware } from './cards/middleware';

// Any middleware we create will be added here
export default [diceMiddleware, cardsMiddleware];
