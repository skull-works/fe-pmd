import  {useState, useReducer} from 'react';

export const Hooks = () => {
    const [filterShow, toggleFilterShow] = useReducer(filterShow => !filterShow, false);
    const [inputs, setInputs] = useState({});
    const [tableData, setTableData] = useState([]);
    const [customerInfo, setCustomerInfo] = useState();
    return  {
        inputs,
        setInputs,
        filterShow,
        toggleFilterShow,
        tableData,
        setTableData,
        customerInfo,
        setCustomerInfo
    };
};
