import React, { useState } from "react";
import MultiSelect from "react-multi-select-component";

function CheckBox(props) {
  const options = props.options.map( (val, key) => { return({label: val, value: key}) });
  const [selected, setSelected] = useState([]);

  const selectHandler = (selects) => {
    setSelected(selects)
    props.handler(selects)
  }

  return (
    <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={selectHandler}
        labelledBy={"Select"}
        disableSearch={true}
        shouldToggleOnHover={true}
        focusSearchOnOpen={false}
        overrideStrings={{"selectSomeItems": props.title,
                          "selectAll": "الكل",
                          "allItemsAreSelected": "الكل",}}
      />
    </div>
  );
};


export default CheckBox;