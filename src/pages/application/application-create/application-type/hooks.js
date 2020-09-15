import React from 'react';

export const Hooks = () => {
    const [inputs, setInputs] = React.useState({type_loan: 'NEW'});
    const [isMarried, setMarried] = React.useState(false);
    const [isDaily, setDaily] = React.useState(true);
    return { inputs, isMarried, isDaily, setInputs, setMarried, setDaily };
}
