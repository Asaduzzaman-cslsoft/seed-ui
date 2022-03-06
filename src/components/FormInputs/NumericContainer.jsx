import React from "react";
import {
  FormGroup,
  Label
} from "reactstrap";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import { GetErrorMessage, NumericKeyDown, NumericKeyPress } from "../../util/Util"

const NumericContainer = props => {
  let error = props.hasError && props.hasError(props.model);
  error = GetErrorMessage(error);
  const bgColor = props.readOnly ? "#eee" : "";
  return (
    <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
      <Label>{props.label}</Label>
      <TextField
        fullWidth
        value={props.value || ""}
        onChange={props.onChange}
        onKeyDown={NumericKeyDown}
        onKeyPress={NumericKeyPress}
        disabled={props.disabled}
        InputProps={{
          name: props.model,
          style: { "backgroundColor": bgColor },
          className: "form-control form-control-sm",
          readOnly: props.readOnly,
          inputProps: {
            style: { textAlign: "right" },
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
            scale: props.scale,
            placeholder: props.placeholder,
            "data-validate": props.validate
          }
        }}
        error={error !== ""}
        helperText={error}
      />
    </FormGroup>
  );
}

NumericContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
};

export default NumericContainer;
