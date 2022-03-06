import React from "react";
import {
  Col,
  Row,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { Card, CardHeader, CardContent } from '@material-ui/core';

import PageBase from "components/Base/PageBase";
import withPageBase from "components/Base/withPageBase";
import Grid from "components/Base/Grid";
import InlineFinder from "components/Base/InlineFinder";

import { AppConst, Services, ShowMessageBox } from "../../../util/Util"
import XlsExport from "../../../util/xls-export";

class QueryViewer extends PageBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      source: [],
      QueryName: "",
      gridConfig: {
        columns:
          [
            { field: 'PrimaryKey', style: { display: 'none' } }
          ],
        lazy: false,
        showRefresh: false,
        limit: 20
      }
    }

    this.childGrid = React.createRef();
    this.inlineFinder = React.createRef();

    this.setConfig({
      serviceName: Services.Seed
    });

  }

  viewResult = (queryModel) => {
    let that = this;
    var query = queryModel.QueryText;
    if (!query) {
      ShowMessageBox({ text: "No Query Text specified !" });
      return;
    }

    this.Post({
      url: `${AppConst.BaseUrl}${Services.Seed}/Query/GetQueryResult`,
      data: { 'QueryText': query }
    })
      .then(result => {
        let columns = [];
        if (result && result.length) {
          Object.keys(result[0]).forEach(key => {
            columns.push({ field: key, header: key.replace(/([a-z](?=[A-Z]))/g, '$1 ') });
          });
        }
        else result = [];

        let template = {
          columns: columns,
          showRefresh: false,
          lazy: false,
          limit: 20
        }
        that.setState({ gridConfig: template, QueryName: queryModel.QueryName, source: result });
      })
  }

  toggleMenu = () => {
    this.setState({
      IsShowExport: !this.state.IsShowExport
    })
  }

  ExportTo = (type) => {
    const xls = new XlsExport(this.state.source, this.state.QueryName);
    if (type === "Excel")
      xls.exportToXLS(this.state.QueryName + ".xls");
    else xls.exportToCSV(this.state.QueryName + ".csv");
  }

  render() {
    return (
      <div className="page-wrapper">
        <Row>
          <Col md={3}>
            <InlineFinder
              height="470px"
              ref={this.inlineFinder}
              config={{
                title: "Queries",
                url: `${AppConst.BaseUrl}${Services.Seed}/Search/GetQueryBanks`,
                columns:
                  [
                    { field: 'QueryId', style: { display: 'none' } },
                    { field: 'QueryName', header: 'Name', filter: true, sortable: true },
                    { field: 'Description', header: 'Description', filter: true, sortable: true }
                  ],
                scrollHeight: "150px",
                keyField: "QueryId",
                sortField: "QueryName",
                sortOrder: "ASC",
                lazy: true,
                limit: 10,
                onSelect: this.viewResult.bind(this)
              }} />
          </Col>
          <Col md={9}>
            <Card style={{ height: "500px" }}>
              <span className="input-group-btn">
                <ButtonDropdown style={{ padding: 3, marginTop: 2, marginLeft: -2 }} isOpen={this.state.IsShowExport} toggle={() => this.toggleMenu()} >
                  <DropdownToggle disabled={!this.state.source.length} caret color={"primary"}>
                    Export To
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.ExportTo("Excel")}>Excel</DropdownItem>
                    <DropdownItem onClick={() => this.ExportTo("CSV")}>CSV</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </span>
              <CardHeader title="" />
              <CardContent>
                <Grid ref={this.childGrid}
                  config={this.state.gridConfig}
                  source={this.state.source}
                  className="p-datatable-gridlines editable-cells-table p-datatable-sm"
                  scrollHeight="400px"
                >
                </Grid>
              </CardContent>
            </Card >
          </Col>
        </Row>
      </div >
    );
  }
}

export default withPageBase(QueryViewer);
