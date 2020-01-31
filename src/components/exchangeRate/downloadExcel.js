import React from 'react';
import ReactExport from 'react-export-excel';
import { Button } from 'reactstrap';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [];

class Download extends React.Component {
  render() {
    return (
      <ExcelFile element={<Button color={'success'}>Exel Template</Button>}>
        <ExcelSheet data={dataSet1} name="ExchangeRate">
          <ExcelColumn label="currency" />
          <ExcelColumn label="buy_cash" />
          <ExcelColumn label="buy_transfer" />
          <ExcelColumn label="sell" />
          <ExcelColumn label="change_USD" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default Download;
