import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import tick from "./green-tick.png";

import Select from "react-select";
import db from "./db.json";
import { Flex, Image } from "rebass";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "",
      options: db.accounts.map((account) => {
        const label = `${account.sortCode} ${account.accountNumber} ${account.accountType} ${account.accountName}`;
        return {
          value: account,
          label: label,
        };
      }),
    };
  }
  componentDidMount() {
    console.log(this.state.selectedLabel);
  }

  handleChange = (e) => {
    this.setState({
      selectedOption: {
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
      },
      options: this.state.options.map((option) => {
        const label = `${option.value.sortCode} ${option.value.accountNumber} ${option.value.accountType} ${option.value.accountName}`;
        return {
          value: option.value,
          label:
            option.label === e.label ? (
              <Flex justifyContent="space-between">
                {label} <Image src={tick} style={{ height: "20px" }} />
              </Flex>
            ) : (
              label
            ),
        };
      }),
    });
  };

  render() {
    return (
      <Select
        value={this.state.selectedOption}
        onChange={(e) => this.handleChange(e)}
        options={this.state.options}
        styles={this.props.customStyle}
      />
    );
  }
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
