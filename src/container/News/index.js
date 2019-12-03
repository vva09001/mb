import React from 'react';
import { Row, Button } from 'reactstrap';
import data from '../../data/news/data';
import NewTable from '../../components/New/Table';
// import Loader from '../../components/common/Loader';
const Activity = () => {
  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>Tin tức</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2">
            Xuất thành tệp tin bảng tính
          </Button>
          <Button color="primary" className="mr-2">
            Nhập tệp tin bản tính
          </Button>
          <Button color="primary" className="mr-2">
            Tạo lập
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <NewTable data={data} />
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Activity;
