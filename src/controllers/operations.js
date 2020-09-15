export const changeManyValue = (tableData, areaCode, fieldName, fieldValue, appId, setTableData) => {
    let index = 0;
    let checker;

    if(fieldName === "status"){
        checker = function(user){
            return user.id === appId;
        }
    }
    else{
        checker = function(user){
            return user.area_code === areaCode
        }
    }

    tableData.forEach( user => {
        if(checker(user)){
            tableData[index][`${fieldName}`] = fieldValue;
            setTableData(tableData);
        }
        ++index;
    });
}