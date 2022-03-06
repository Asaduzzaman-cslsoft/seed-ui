import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import { GetErrorMessage, AppConst } from "../../util/Util";

const DateTimeContainer = props => {
  let error = props.hasError && props.hasError(props.model);
  error = GetErrorMessage(error);
  const bgColor = props.disabled ? "#eee" : "";
  return (
    <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
      <Label>{props.label}</Label>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          fullWidth
          value={props.value || null}
          onChange={props.onChange}
          disabled={props.disabled}
          InputProps={{
            name: props.model,
            style: { "backgroundColor": bgColor },
            className: "form-control form-control-sm",
            readOnly: true,
            inputProps: {
              "data-validate": props.validate
            }
          }}
          // disableToolbar
          // variant='inline'
          clearable
          autoOk
          format={`${AppConst.DateFormat} ${AppConst.TimeFormat}`}
          error={error !== ""}
          helperText={error}
        />
      </MuiPickersUtilsProvider>
    </FormGroup>
  );
}

DateTimeContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired
};

export default DateTimeContainer;
