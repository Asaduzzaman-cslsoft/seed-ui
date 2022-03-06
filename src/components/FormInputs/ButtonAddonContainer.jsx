import React from "react";
import {
  FormGroup,
  Label
} from "reactstrap";
import { Button } from 'primereact/button';
import PropTypes from "prop-types";
import { GetErrorMessage } from "../../util/Util"

const ButtonAddonContainer = props => {
  let error = props.hasError && props.hasError(props.model);
  error = GetErrorMessage(error);
  return (
    <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
      <Label>{props.label}</Label>
      <div className="input-group">
        <input
          type="text"
          readOnly
          name={props.model}
          value={props.value || ""}
          className="form-control"
          placeholder={props.placeholder}
          data-validate={props.validate}
          style={{ height: "30px", outline: "none", borderBottom: "1px solid rgba(0, 0, 0, 0.42)" }}
          error={error !== "" ? true.toString() : false.toString()}
        />
        <div className="input-group-append" style={{ height: "30px" }}>
          <Button icon={'pi ' + props.icon} title={props.buttonTitle} className="p-button-outlined" disabled={props.disabled} onClick={props.onClick} />
        </div>
      </div>
      {error !== "" ? <span className="invalid-feedback-custom">{error}</span> : ""}
    </FormGroup>
  );
}

ButtonAddonContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
};

ButtonAddonContainer.defaultProps = {
  icon: "pi-search"
};

export default ButtonAddonContainer;
