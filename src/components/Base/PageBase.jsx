import React from "react";
import { AppConst, Services, ModelState, ShowConfirmBox, HasException, ParseError, GetElementsByTagNames } from "../../util/Util";
import { $http } from "../../util/HttpRequest";
import FormValidator from "../../util/FormValidator";

const defaults = {
  serviceName: Services.Seed,
  keyModel: "Model",
  keyField: "",
  displayField: "",
  newIdString: AppConst.NewIDString,
  showSuccessfullyMsg: true,
  getUrl: "",
  createUrl: "",
  updateUrl: "",
  deleteUrl: "",
  defaultValues: {},
  showSearchText: false,
  autoClear: true,
  autoNew: false,
  afterNew: function () { },
  beforeFill: function (model) {
    return true;
  },
  beforeLoad: function (model) { },
  afterLoad: function (model) { },
  beforeSave: function (model) {
    return Promise.resolve(true);
  },
  afterSave: function (model, state) {

  },
  beforeDelete: function (primaryId, model) {
    return Promise.resolve(true);
  },
  afterDelete: function (primaryId) { },
  afterClear: function () { }
};

class PageBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Model: {},
      errors: {}
    };
    this.$config = Object.assign({}, defaults, {});
    this.setConfig = this.setConfig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.hasError = this.hasError.bind(this);
    this.useInput = this.useInput.bind(this);
    this.New = this.New.bind(this);
    this.Search = this.Search.bind(this);
    this.OnSelect = this.OnSelect.bind(this);
    this.Load = this.Load.bind(this);
    this.CreateUpdate = this.CreateUpdate.bind(this);
    this.Delete = this.Delete.bind(this);
    this.Clear = this.Clear.bind(this);
    this.PrintMessageInFooter = this.PrintMessageInFooter.bind(this);
  }

  setConfig(config) {
    this.$config = Object.assign({}, defaults, config);
    this.$config.BaseUrl = `${AppConst.BaseUrl}${this.$config.serviceName}`;
  }
  ShowWait() {
    this.setState({ showLoader: true });
  }
  HideWait() {
    this.setState({ showLoader: false });
  }
  PrintMessageInHeader(message) {
    const showSnackbar = { show: true, vertical: 'top', horizontal: 'center', severity: "success", message: message, autoHideDuration: 4000 }
    this.setState({ showSnackbar: showSnackbar })
  }
  PrintMessageInFooter(message) {
    const showSnackbar = { show: true, vertical: 'bottom', horizontal: 'center', severity: "error", message: message, autoHideDuration: null }
    this.setState({ showSnackbar: showSnackbar })
  }
  ErrorCallback = (error) => {
    this.HideWait();
    if (error) {
      if (error.toString() === "Network Error" || error.status === -1)
        this.PrintMessageInFooter("Server not found....");
      else if (error.data) this.PrintMessageInFooter(ParseError(error.data));
      else if (error.message) this.PrintMessageInFooter(error.message);
      else if (error.toString() !== "Unauthorized") this.PrintMessageInFooter("Internal server error....");
    }
    else this.PrintMessageInFooter("Internal server error....");
  };
  handleChange(e, modelName, onChange) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({ [modelName]: { ...this.state[modelName], [name]: value } },
      () => {
        if (onChange) onChange(value);
      });
    this.Valid(e.target);
  }
  handleDateChange(value, name, modelName, onChange) {
    if (value instanceof Date && !isNaN(value.valueOf())) {
      value.setSeconds(0);
      value.setMilliseconds(0);
    }
    this.setState({ [modelName]: { ...this.state[modelName], [name]: value } },
      () => {
        if (onChange) onChange(value);
      });
    let that = this;
    setTimeout(function () {
      let element = document.getElementsByName(name);
      if (element.length)
        that.Valid(element[0]);
    })
  }
  Validate() {   
    const { errors, hasError } = this.GetInputStatus();
    this.setState({
      errors: errors
    });
    return !hasError;
  }
  GetInputStatus() {
    let inputs = GetElementsByTagNames('input,textarea,select', document.getElementsByClassName("page-wrapper")[0]);
    const { errors, hasError } = FormValidator.bulkValidate(inputs);
    return { errors, hasError };
  }
  Valid(input) {    
    const result = FormValidator.validate(input);
    this.setState({
      errors: {
        ...this.state.errors,
        [input.name]: result
      }
    });    
  }
  ClearValidate() {
    this.setState({
      errors: {}
    });
  }
  hasError = (inputName) => {
    let errors = {};
    if (this.state.errors) {
      let error = this.state.errors[inputName];
      if (error) {
        Object.entries(error)
          .forEach(([key, value]) => {
            if (value === true) errors[key] = true;
          });
      }
    }
    return errors;
  };
  IsValidToSubmit = () => {    
    const { hasError } = this.GetInputStatus();
    return !hasError;
  }
  useInput = (props) => {
    props.modelName = props.modelName || "Model";
    props.validate = props.validate || '[]';
    const value = this.state[props.modelName][props.fieldName];
    return {
      model: props.fieldName,
      modelName: props.modelName,
      value: value,
      onChange: props.isDateTime ? e => this.handleDateChange(e, props.fieldName, props.modelName, props.onChange) : e => this.handleChange(e, props.modelName, props.onChange),
      hasError: this.hasError,
      validate: props.validate
    }
  }
  New() {
    if (this.$config.autoClear) this.Clear();
    else this.ClearValidate();
    let model = { ...this.$config.defaultValues, ModelState: ModelState.Added };
    if (this.$config.keyField)
      model[this.$config.keyField] = this.$config.newIdString;
    if (this.$config.displayField)
      model[this.$config.displayField] = AppConst.NewIDString;
    this.setState({
      Model: model
    }, () => {
      if (this.$config.afterNew) this.$config.afterNew();
    });
  }
  Search() {
    if (this.finder
      && this.finder.current)
      this.finder.current.toggleFinder();
  }
  OnSelect(selectedRow) {
    if (selectedRow && selectedRow[this.$config.keyField]) {
      this.Load(selectedRow[this.$config.keyField]);
    }
  }
  addHeader() {
    return {
      headers: {
        menuprivilege: JSON.stringify(this.props.menuPrivilege || {}),
        menuparameter: JSON.stringify(this.props.parameters || {})
      }
    };
  }
  Load(primaryId) {
    this.ShowWait();
    if (this.$config.beforeLoad) this.$config.beforeLoad(primaryId);
    $http.get(`${this.$config.BaseUrl}/${this.$config.getUrl}/${primaryId}`, this.addHeader())
      .then(res => {
        this.HideWait();
        if (HasException(res, this.PrintMessageInFooter)) return;
        let model = res.Result || {};
        model.ModelState = ModelState.Modified;
        let manualFill = false;
        if (this.$config.beforeFill && this.$config.beforeFill(model))
          this.setState({
            Model: model
          });
        else manualFill = true;
        if (
          !manualFill &&
          (!model[this.$config.keyField] ||
            model[this.$config.keyField] === AppConst.IntMinValue)
        ) {
          model.ModelState = ModelState.Added;
          if (!model[this.$config.keyField]) {
            if (this.$config.newIdString)
              model[this.$config.keyField] = this.$config.newIdString;
            if (this.$config.displayField)
              model[this.$config.displayField] = this.$config.newIdString;
          }
          this.setState({
            Model: model
          });
        }
        if (this.$config.afterLoad) this.$config.afterLoad(model);
        this.ClearValidate();
      }, this.ErrorCallback);
  }
  CreateUpdate() {
   
    if (!this.Validate()) return;        
    let model = { ...this.state.Model };
    let currentState=model.state;
   // console.log(currentState);
  //   return; 
  // if(currentState===undefined){
  //   currentState=ModelState.Added;
  // }
    let isNew = false;
    //console.log("State: "+currentState);
    if (
      this.$config.newIdString &&
      model[this.$config.keyField] === this.$config.newIdString
    ) {
      model[this.$config.keyField] = "0";
      isNew = true;
    }
    if (this.$config.beforeSave) {
      Promise.resolve(this.$config.beforeSave(model))
        .then((confirm) => {
          if (confirm) {
            let msg = AppConst.UpdatedSuccessfullyMsg;
            let url = `${this.$config.BaseUrl}/${this.$config.updateUrl}`;
            let action = 'put';
            if (currentState === ModelState.Added) {
              msg = AppConst.AddedSuccessfullyMsg;
              url = `${this.$config.BaseUrl}/${this.$config.createUrl}`;
              model.state=ModelState.Added;
              action = 'post';
            }
            this.ShowWait();
            $http[action](url, model, this.addHeader())
              .then(res => {
                this.HideWait();
                if (HasException(res, this.PrintMessageInFooter)) return;
                if (this.$config.showSuccessfullyMsg)
                  this.PrintMessageInHeader(msg);
                let model = res.Result || {};
                model.ModelState = ModelState.Modified;
                this.setState({
                  Model: model
                }, () => {
                  if (this.$config.afterSave) this.$config.afterSave(model, currentState);
                });
              }, this.ErrorCallback);
          }
          else {
            if (isNew) model[this.$config.keyField] = this.$config.newIdString;
            return;
          }
        });
    }
  }

  Delete() {
    if (!this.Validate()) return;
    let that = this;
    let model = { ...this.state.Model };
    let primaryId = model[this.$config.keyField];
    if (
      primaryId === undefined ||
      primaryId === "" ||
      primaryId === this.$config.newIdString ||
      primaryId === "0" ||
      parseInt(primaryId) === AppConst.IntMinValue
    )
      return;
    model.ModelState = ModelState.Deleted;
    if (this.$config.beforeDelete) {
      Promise.resolve(this.$config.beforeDelete(primaryId, model))
        .then((confirm) => {
          if (confirm) {
            ShowConfirmBox({
              title: "Delete Confirmation",
              text: "Are you sure you want to permanently delete info?",
              onOkClick: function () {
                that.ShowWait();
                $http.delete(`${that.$config.BaseUrl}/${that.$config.deleteUrl}`, { data: model, ...that.addHeader() })
                  .then(res => {
                    that.HideWait();
                    if (HasException(res, that.PrintMessageInFooter)) return;
                    that.Clear();
                    if (that.$config.showSuccessfullyMsg)
                      that.PrintMessageInHeader(AppConst.DeletedSuccessfullyMsg);
                    if (that.$config.afterDelete) that.$config.afterDelete(primaryId);
                  }, this.ErrorCallback);
              }
            });
          }
        });
    }
  }
  Clear() {
    let model = { ModelState: ModelState.Unchanged };
    this.setState({ Model: model }, () => {
      if (this.$config.afterClear) this.$config.afterClear();
      this.ClearValidate();
    });
  }
  async Get(config) {
    if (!config || !config.url) return Promise.reject("Error");
    if (!config.data) config.data = {};
    config.data.ticks = new Date().valueOf();
    this.ShowWait();
    return await $http.get(config.url, {
      params: config.data,
      ...this.addHeader()
    }).then(res => {
      this.HideWait();
      if (HasException(res, this.PrintMessageInFooter)) return Promise.reject("Error");
      else return Promise.resolve(res.Result);
    }, this.ErrorCallback);
  }
  async Post(config) {
    if (!config || !config.url) return Promise.reject("Error");
    if (!config.data) config.data = {};
    this.ShowWait();
    return await $http.post(config.url, config.data, this.addHeader())
      .then(res => {
        this.HideWait();
        if (HasException(res, this.PrintMessageInFooter)) return Promise.reject("Error");
        else return Promise.resolve(res.Result);
      }, this.ErrorCallback);
  }
  async Put(config) {
    if (!config || !config.url) return Promise.reject("Error");
    if (!config.data) config.data = {};
    this.ShowWait();
    return await $http.put(config.url, config.data, this.addHeader())
      .then(res => {
        this.HideWait();
        if (HasException(res, this.PrintMessageInFooter)) return Promise.reject("Error");
        else return Promise.resolve(res.Result);
      }, this.ErrorCallback);
  }
  async Del(config) {
    if (!config || !config.url) return Promise.reject("Error");
    if (!config.data) config.data = {};
    this.ShowWait();
    return await $http.delete(config.url, { data: config.data, ...this.addHeader() })
      .then(res => {
        this.HideWait();
        if (HasException(res, this.PrintMessageInFooter)) return Promise.reject("Error");
        else return Promise.resolve(res.Result);
      }, this.ErrorCallback);
  }
}

export default PageBase;
