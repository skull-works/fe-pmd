import  {useState, useReducer} from 'react';

export const Hooks = () => {
    const [filterShow, toggleFilterShow] = useReducer(filterShow => !filterShow, false);
    const [inputs, setInputs] = useState({});
    const [tableData, setTableData] = useState([]);
    const [passbookItems, setPassbookItems] = useState([]);
    const [customerInfo, setCustomerInfo] = useState();
    const [balance, setBalance] = useState();

    return  {
        inputs,
        setInputs,
        tableData,
        setTableData,
        passbookItems,
        setPassbookItems,
        customerInfo,
        setCustomerInfo,
        balance,
        setBalance,
        filterShow,
        toggleFilterShow
    };
};
