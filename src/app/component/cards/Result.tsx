import * as React from 'react';
import { CardsDraw } from '../../store/cards/types';


interface Props {
    draw: CardsDraw;
    isLoading?: boolean;
    error?: string;
}


const Result: React.StatelessComponent<Props> = (props) => {
    const { draw, isLoading, error } = props;

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

    if (error) {
        return <>Error: {error}</>;
    }

    return <></>;
};


export default Result;
