import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxContainer = props => (
  <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
    <Label>
      &nbsp;
    </Label>
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value || false}
            onChange={props.onChange}
            name={props.model}
            color="primary"
            disabled={props.disabled}
          />
        }
        label={props.label}
      />
    </div>
  </FormGroup>
);

CheckboxContainer.propTypes = {
  model: PropTypes.string.isRequired
};

export default CheckboxContainer;
