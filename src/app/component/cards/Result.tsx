import * as React from 'react';
import { CardsDraw } from '../../store/cards/types';


interface Props {
    draw: CardsDraw;
    isLoading?: boolean;
}


const Result: React.StatelessComponent<Props> = (props) => {
    const { draw, isLoading } = props;

    if (isLoading) {
        return <>Drawing...</>;
    }

    if (draw) {
        const { request, cards } = draw;

        return (
            <>
                {cards.map((c, i) => c + (i + 1 === cards.length ? '' : ', '))}
                {' '} (draw {request.number} from {request.decks} deck(s))
            </>
        );
    }

    return <></>;
};


export default Result;
