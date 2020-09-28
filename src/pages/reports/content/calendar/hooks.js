import  {useState, useReducer} from 'react';

export const Hooks = () => {
    const [filterShow, toggleFilterShow] = useReducer(filterShow => !filterShow, false);
    const [inputs, setInputs] = useState({});
    const [dates, setDates] = useState([]);
    const [customerPayments, setCustomerPayments] = useState([]);
    return  {
        inputs,
        setInputs,
        filterShow,
        toggleFilterShow,
        dates,
        setDates,
        customerPayments,
        setCustomerPayments
    };
};
