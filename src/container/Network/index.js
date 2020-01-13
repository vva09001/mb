import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import NetworkTable from '../../components/network/Table';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import PopupComfirm from 'components/common/PopupComfirm';
import { NetworkActions } from '../../store/actions';
import history from 'helpers/history';
import { map } from 'lodash';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getNetwork: PropTypes.func,
  deleteNetwork: PropTypes.func,
  getDetail: PropTypes.func
};

function Network({ data, getNetwork, deleteNetwork, getDetail }) {
  const [isOpen, setIsOpen] = useState(false);
  const [networkID, setNetworkID] = useState(null);

  useEffect(() => {
    getNetwork();
  }, [getNetwork]);

  const { t } = useTranslation();

  const onDelete = () => {
    if (networkID !== null) {
      deleteNetwork(networkID);
      setIsOpen(!isOpen);
    }
  };
  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/network/detail');
  };

  return (
    <React.Fragment>
      <div>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/network/create')}>
            {t('network.create')}
          </Button>
          {/* <Button color="danger" className="mr-2" onClick={openComfirm}>
            {t('network.down')}
          </Button> */}
        </Row>
        <Row>
          <h6>{t('network.danhsach')}</h6>
        </Row>
      </div>
      <Row style={{ background: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Col lg={2} md={3} />
        <Col lg={6} md={5}>
          <Form className="p-3">
            <FormGroup>
              <Label for="exampleSelect">{t('network.network_category')}</Label>
              <Input type="select" name="network_category">
                <option>{t('select')}</option>
                {map(data, value => (
                  <option value={value.id} key={value.id}>
                    {value.network_category}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">{t('status')}</Label>
              <Input type="select" name="status">
                <option>{t('select')}</option>
                <option>{t('approveds')}</option>
                <option>{t('pendings')}</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">{t('network.processingunit')}</Label>
              <Input type="select" name="processingunit">
                <option>{t('select')}</option>
                <option>PTT(mạng lưới) - Cấp 2</option>
                <option>PTT(mạng lưới) - Cấp 3</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">{t('network.language')}</Label>
              <Input type="select" name="language">
                <option>{t('select')}</option>
                {map(data, value => (
                  <option value={value.id} key={value.id}>
                    {value.language}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">
              {t('search')}
            </Button>
          </Form>
        </Col>
        <Col lg={4} md={4} />

        <NetworkTable data={data} getID={id => setNetworkID(id)} getDetail={onGetDetail} />

        <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
      </Row>
    </React.Fragment>
  );
}

Network.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.NetworkReducer.data };
};

const mapDispatchToProps = {
  getNetwork: NetworkActions.getNetwork,
  deleteNetwork: NetworkActions.deleteNetwork,
  getDetail: NetworkActions.getDetailNetwork
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Network);
