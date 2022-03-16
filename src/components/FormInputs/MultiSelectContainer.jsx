import React from "react";
import { FormGroup, Label } from "reactstrap";
import PropTypes from "prop-types";
import "react-select2-wrapper/css/select2.css";
import { $http } from "../../util/HttpRequest";
import { GetErrorMessage } from "../../util/Util";
import Multiselect from "multiselect-react-dropdown";

class MultiSelectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.islocal = false;
    if (props.source) this.islocal = true;
  }
  GetUserData(array, id) {
    var data = array.find((element) => {
      return element.UserId === id;
    });
    return data;
  }
  componentDidMount() {
    setTimeout(() => {
      if (!this.props.source && this.props.url) {
        $http.get(this.props.url).then((res) => {
          this.setState({ source: res.Result || [] });
          if (this.props.selectedUsersList) {
            var selectedUsers = [];
            //let valueMember= this.props.mapper.valueMember;
            var data = res.Result;
            var selectedIds = this.props.selectedUsersList;
            for (var i = 0; i < selectedIds.length; i++) {
              let getUser = this.GetUserData(data, selectedIds[i]);
              if (getUser) {
                selectedUsers.push(getUser);
              }
            }
            this.setState({ selectedValue: selectedUsers });
          }
        });
      }
    }, 100);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.url &&
      prevProps.url !== this.props.url &&
      !this.props.source
    ) {
      $http.get(this.props.url).then((res) => {
        this.setState({ source: res.Result || [] });
      });
    }
  }
  render() {
    const props = { ...this.props };
    let displayMember = props.mapper.textMember;
    let error = props.hasError && props.hasError(props.model);
    error = GetErrorMessage(error);
    // let data = this.islocal ? props.source : this.state.source;
    // if (data && props.mapper && IsObject(props.mapper)
    //   && props.mapper.valueMember
    //   && props.mapper.textMember) {
    //   data = data.map(function (item, i) {
    //     return (
    //       {
    //         key: i,
    //         id: item.id || item[props.mapper.valueMember],
    //         name: item.text || item[props.mapper.textMember]
    //       }
    //     );
    //   });
    // }
    let value = props.value || "";
    if (props.isBoolValue) {
      if (value !== "" && value !== undefined && value !== null)
        value = value.toString();
      else value = "false";
    }
    return (
      <FormGroup style={{ display: props.visible === false ? "none" : "" }}>
        <Label>{props.label}</Label>

        <Multiselect
          options={this.state.source} // Options to display in the dropdown
          selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
          onSelect={this.props.onSelect} // Function will trigger on select event
          onRemove={this.props.onRemove} // Function will trigger on remove event
          displayValue={displayMember} // Property name to display in the dropdown options
          style={{ width: "100%" }}
        />
        {error !== "" ? (
          <span className="invalid-feedback-custom">{error}</span>
        ) : (
          ""
        )}
      </FormGroup>
    );
  }
}

MultiSelectContainer.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default MultiSelectContainer;
