import  {useState, useReducer} from 'react';

export const Hooks = () => {
    const [filterShow, toggleFilterShow] = useReducer(filterShow => !filterShow, false);
    const [inputs, setInputs] = useState({});
    const [lineGraph, setLineGraph] = useState([]);
    return  {
        inputs,
        setInputs,
        filterShow,
        toggleFilterShow,
        lineGraph,
        setLineGraph,
    };
};
