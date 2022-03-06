import React from "react";
import {
  FormGroup,
  Label
} from "reactstrap";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';
import { GetErrorMessage } from "../../util/Util"

const TextContainer = props => {
  let error = props.hasError && props.hasError(props.model);
  error = GetErrorMessage(error);
  const bgColor = props.readOnly ? "#eee" : "";
  return (
    <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
      <Label>{props.label}</Label>
      <TextField
        type={props.type}
        fullWidth
        value={props.value || ""}
        onChange={props.onChange}
        disabled={props.disabled}
        rows={props.rows}
        multiline={props.rows ? true : false}
        InputProps={{          
          name: props.model,
          style: { "backgroundColor": bgColor },
          className: "form-control form-control-sm",
          readOnly: props.readOnly,
          inputProps: {
            autoComplete: 'off',
            autoCorrect: 'off',
            autoCapitalize: 'off',
            spellCheck: 'false',
            maxLength: props.maxLength,
            placeholder: props.placeholder,
            "data-validate": props.validate,
            "data-param": props.equalto
          }
        }}

        error={error !== ""}
        helperText={error}
      />
    </FormGroup>
  );
}

TextContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
};

TextContainer.defaultProps = {
  type: "text"
};

export default TextContainer;
