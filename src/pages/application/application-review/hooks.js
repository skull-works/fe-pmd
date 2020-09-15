import  {useState, useReducer} from 'react';

export const Hooks = () => {
    const [filterShow, toggleFilterShow] = useReducer(filterShow => !filterShow, false);
    const [inputs, setInputs] = useState({});
    const [tableData, setTableData] = useState([]);
    const [ApplicationDetails, setApplicationDetails] = useState();
    return  {
        inputs,
        setInputs,
        tableData,
        setTableData,
        ApplicationDetails,
        setApplicationDetails,
        filterShow,
        toggleFilterShow
    };
};
