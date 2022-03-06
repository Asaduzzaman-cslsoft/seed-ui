import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { $http } from "../../util/HttpRequest";
import { GetErrorMessage, IsObject } from "../../util/Util"

class SelectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.islocal = false;
    if (props.source)
      this.islocal = true;
  }
  componentDidMount() {
    if (!this.props.source && this.props.url) {
      $http.get(this.props.url).then(res => {
        this.setState({ source: res.Result || [] });
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url
      && prevProps.url !== this.props.url
      && !this.props.source) {
      $http.get(this.props.url).then(res => {
        this.setState({ source: res.Result || [] });
      });
    }
  }
  render() {
    const props = { ...this.props };
    let error = props.hasError && props.hasError(props.model);
    error = GetErrorMessage(error);
    let data = this.islocal ? props.source : this.state.source;
    if (data && props.mapper && IsObject(props.mapper)
      && props.mapper.valueMember
      && props.mapper.textMember) {
      data = data.map(function (item, i) {
        return (
          {
            key: i,
            id: item.id || item[props.mapper.valueMember],
            text: item.text || item[props.mapper.textMember]
          }
        );
      });
    }
    let value = props.value || "";
    if (props.isBoolValue) {
      if (value !== "" && value !== undefined && value !== null)
        value = value.toString();
      else value = "false";
    }
    return (
      <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
        <Label>{props.label}</Label>
        <Select2
          className={error ? "select2-invalid" : "display-none"}
          style={{ width: "100%" }}
          name={props.model}
          data={data}
          value={value}
          onOpen={() => this.setState({ isSelectOpen: true })}
          onClose={() => this.setState({ isSelectOpen: false })}
          onChange={e => {
            if (this.state.isSelectOpen) {
              props.onChange(e);
              this.setState({ isSelectOpen: false })
            }
          }}
          disabled={props.disabled}
          data-validate={props.validate}
        />
        {error !== "" ? <span className="invalid-feedback-custom">{error}</span> : ""}
      </FormGroup>
    );
  }
}

SelectContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
};

export default SelectContainer;
