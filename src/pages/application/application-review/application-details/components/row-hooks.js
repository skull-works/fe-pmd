import  {useState, useReducer} from 'react';

export const RowHooks = () => {
    const [isUpdate, toggleUpdate] = useReducer(isUpdate => !isUpdate, false);
    const [inputs, setInputs] = useState({});
    const [isDaily, setDaily] = useState(true);
    return {
        inputs:inputs,
        setInputs: setInputs,
        isDaily: isDaily,
        setDaily: setDaily,
        isUpdate: isUpdate,
        toggleUpdate: toggleUpdate
    }
};
