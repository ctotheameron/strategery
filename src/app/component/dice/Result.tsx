import * as React from 'react';
import { DiceRoll } from '../../store/dice/types';


interface Props {
    roll: DiceRoll;
    isLoading?: boolean;
}


const Result: React.StatelessComponent<Props> = (props) => {
    const { roll, isLoading } = props;

    if (isLoading) {
        return <>Rolling...</>;
    }

    if (roll) {
        const { request, rolls, sum } = roll;

        return (
            <>
                <b>{sum}</b>
                {' '}
                (
                {request.number}d{request.sides}:
                {' '}
                {rolls.map((r, i) => r + (i + 1 === rolls.length ? '' : ', '))}
                )
            </>
        );
    }

    return <></>;
};


export default Result;
