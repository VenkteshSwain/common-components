import React, { useState } from "react";
import "./styles.css";
import tick from "./green-tick.png";
import Select from "react-select";
import db from "./db.json";
import { Flex, Image } from "rebass";

export default function Dropdown(props) {
  const [selectedOption, setSelectedOption] = useState();
  const [options, setOptions] = useState(
    db.map((account) => {
      return {
        value: account,
        label: `${account.sortCode} ${account.accountNumber} ${account.accountType} ${account.accountName}`,
      };
    })
  );

  const changeHandler = (e) => {
    setSelectedOption({
      value: e.value,
      label: (
        <>
          <div>
            {e.value.sortCode} &nbsp;&nbsp;&nbsp;&nbsp;
            {e.value.accountNumber}
          </div>
          <div>
            {" "}
            {e.value.accountType} - {e.value.accountName}
          </div>
        </>
      ),
    });
    setOptions(
      db.map((account) => {
        const label = `${account.sortCode} ${account.accountNumber} ${account.accountType} ${account.accountName}`;
        return {
          value: account,
          label:
            e.value === account ? (
              <Flex justifyContent="space-between">
                {label} <Image src={tick} style={{ height: "20px" }} />
              </Flex>
            ) : (
              label
            ),
        };
      })
    );
  };

  return (
    <Select
      value={selectedOption}
      onChange={(e) => changeHandler(e)}
      options={options}
      styles={props.customStyle}
    />
  );
}

Dropdown.defaultProps = {
  customStyle: {
    valueContainer: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  },
};
