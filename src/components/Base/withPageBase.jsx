import React from "react";
import { ButtonGroup } from 'reactstrap';
import { Button } from 'primereact/button';
import Finder from "../Base/Finder";

import { ModelState } from "../../util/Util";
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const withPageBase = WrappedPage => {
    class WithPageBase extends WrappedPage {
        constructor(props) {
            super(props);
            if (!this.$config.buttons) this.$config.buttons = [];
            this.finder = React.createRef();
        }

        hideSnackbar = (event, reason) => {
            if (reason === 'clickaway') return;
            this.setState({ showSnackbar: { ...this.state.showSnackbar, show: false } })
        };

        render() {
            const { Model, showLoader } = this.state;
            const isValidForm = (Model.ModelState === ModelState.Added || Model.ModelState === ModelState.Modified) && this.IsValidToSubmit();
            let showSnackbar = { ...this.state.showSnackbar };
            let { menuPrivilege } = this.props;
            menuPrivilege = menuPrivilege || {};
            menuPrivilege.CanCreate = true;
            menuPrivilege.CanRead = true;
            menuPrivilege.CanUpdate = true;
            menuPrivilege.CanDelete = true;
            let buttons = [...this.$config.buttons];
            if (this.$config.showPrint && menuPrivilege.CanRead) buttons.push({ text: "Print", onClick: this.$config.onPrint, icon: "pi pi-print", class: "p-button-raised p-button-primary" });
            if (this.$config.showNew && menuPrivilege.CanCreate) buttons.push({ text: "New", onClick: this.New, icon: "pi pi-plus-circle", class: "p-button-raised p-button-info" });
            if (this.$config.showSearch && menuPrivilege.CanRead) buttons.push({ text: "Search", onClick: this.Search, icon: "pi pi-search", class: "p-button-raised p-button-help" });
            if (this.$config.showCreate && menuPrivilege.CanCreate && Model.ModelState !== ModelState.Modified) buttons.push({ text: "Create", onClick: this.CreateUpdate, icon: "pi pi-check-circle", class: "p-button-raised p-button-success", disabled: !isValidForm });
            if (this.$config.showUpdate && menuPrivilege.CanUpdate && Model.ModelState === ModelState.Modified) buttons.push({ text: "Update", onClick: this.CreateUpdate, icon: "pi pi-save", class: "p-button-raised p-button-success", disabled: !isValidForm });
            // if (this.$config.showSave && menuPrivilege.CanUpdate) buttons.push({ text: Model.ModelState === ModelState.Modified ? "Update" : "Create", onClick: this.CreateUpdate, icon: Model.ModelState === ModelState.Modified ? "pi pi-check-circle" : "pi pi-save", class: "p-button-raised p-button-success", disabled: !isValidForm });
            if (this.$config.showClear && menuPrivilege.CanRead) buttons.push({ text: "Clear", onClick: this.Clear, icon: "pi pi-times-circle", class: "p-button-raised p-button-warning" });
            if (this.$config.showDelete && menuPrivilege.CanDelete) buttons.push({ text: "Delete", onClick: this.Delete, icon: "pi pi-trash", class: "p-button-raised p-button-danger", disabled: !isValidForm });

            const render = buttons.map(function (btn, i) {
                return (
                    <Button
                        key={i}
                        className={btn.class}
                        style={{ margin: '0 4px 0 0', width: '94px', height: "32px" }}
                        label={btn.text}
                        icon={btn.icon}
                        title={btn.title || btn.text}
                        onClick={btn.onClick}
                        // disabled={btn.disabled}
                    />
                );
            });

            return <div>
                <Snackbar
                    anchorOrigin={{ vertical: showSnackbar.vertical || "top", horizontal: showSnackbar.horizontal || "center" }}
                    open={showSnackbar.show}
                    autoHideDuration={showSnackbar.autoHideDuration}
                    onClose={this.hideSnackbar}>
                    <Alert onClose={this.hideSnackbar} severity={showSnackbar.severity}>
                        {showSnackbar.message}
                    </Alert>
                </Snackbar>
                <LoadingOverlay
                    active={showLoader}
                    spinner={<BounceLoader color={"#0F94F1"} />}
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: 'rgba(244, 244, 244, 0.6)'
                        })
                    }}>
                    {super.render()}
                    <footer className="app-footer">
                        <ButtonGroup vertical={false}>
                            {render}
                        </ButtonGroup>
                    </footer>                   
                    {this.$config.showSearch && this.$config.finder && <Finder ref={this.finder} config={this.$config.finder} />}
                </LoadingOverlay>
            </div>
        }
    }
    return WithPageBase;
}


export default withPageBase;