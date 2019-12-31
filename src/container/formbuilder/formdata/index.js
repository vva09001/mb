import React from 'react';
import { Table } from 'reactstrap';
function Formdata() {
  return (
    <div className="formdata">
      <h4>Form-data</h4>
      <Table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Textarea</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1234</td>
            <td>sfsdfsd</td>
            <td>1 Motnh</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>sfsdfsd</td>
            <td>1 Motnh</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
export default Formdata;
