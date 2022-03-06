import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const RadioContainer = props => {
  if (!props.radios) return "";
  const render = props.radios.map(function (radio, i) {
    return (
      <FormControlLabel key={i}
        control={<Radio
          checked={props.value === radio.value}
          onChange={props.onChange}
          value={radio.value}
          name={props.model}
          disabled={props.disabled}
          color="primary"
        />}
        label={radio.label} />
    );
  });

  return (
    <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
      <Label>{props.label}</Label>
      <RadioGroup row>
        {render}
      </RadioGroup>
    </FormGroup>
  );
};

RadioContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  radios: PropTypes.array.isRequired
};

export default RadioContainer;
