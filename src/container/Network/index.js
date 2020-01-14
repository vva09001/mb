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
  data: PropTypes.object,
  getNetwork: PropTypes.func,
  deleteNetwork: PropTypes.func,
  getDetail: PropTypes.func,
  getDataSearch: PropTypes.func,
  dataSearch: PropTypes.array
};

function Network({ data, getNetwork, deleteNetwork, getDetail, getDataSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [networkID, setNetworkID] = useState(null);

  useEffect(() => {
    getNetwork();
  }, [getNetwork]);
  let list = data.data;
  const { t } = useTranslation();

  const Category= map(data.search, values => {
    return values.network_category;
  });

  const uniqueSet = Array.from(new Set(Category));

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
  const [formState, setFormState] = useState({
    dataSearch: {},
  });

  const search = (event) => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      dataSearch: {
        ...formState.dataSearch,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const submitSearch =() => {
    let dataDetailSearch = {};
    let checkCategory = true;
    let checkStatus = true;
    if (formState.dataSearch.category === undefined || formState.dataSearch.category === '') {
      checkCategory = null;
    }
    if (formState.dataSearch.status === undefined || formState.dataSearch.status === '') {
      checkStatus = null;
    }
    if (checkCategory){
      dataDetailSearch.category = formState.dataSearch.category
    }
    if (checkStatus){
      dataDetailSearch.status = formState.dataSearch.status
    }
    getDataSearch(dataDetailSearch);
  };

  return (
    <React.Fragment>
      <div>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/network/create')}>
            {t('network.create')}
          </Button>
          <Button color="danger" className="mr-2">
            {t('network.down')}
          </Button>
        </Row>
        <Row>
          <h6>{t('network.danhsach')}</h6>
        </Row>
      </div>
      <Row style={{ background: '#fff' }}>
        <Col lg={2} md={3} />
        <Col lg={6} md={5}>
          <Form className="p-3">
            <FormGroup>
              <Label for="exampleSelect">{t('network.network_category')}</Label>
              <Input type="select" name="category" onChange={search}>
                <option value="">{t('select')}</option>
                {map(uniqueSet, (value,key) => (
                  <option value={value} key={key}>
                    {value}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">{t('status')}</Label>
              <Input type="select" name="status" onChange={search}>
                <option value="">{t('select')}</option>
                <option value="1">{t('approveds')}</option>
                <option value="0">{t('pendings')}</option>
              </Input>
            </FormGroup>
            <Button color="primary" onClick={submitSearch}>
              {t('search')}
            </Button>
          </Form>
        </Col>
        <Col lg={4} md={4} />

        <NetworkTable data={list} getID={id => setNetworkID(id)}  deleteNetwork={deleteNetwork}  />

        <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
      </Row>
    </React.Fragment>
  );
}

Network.propTypes = PropsType;

const mapStateToProps = state => {
  return {
    data: state.NetworkReducer.data ,
    dataSearch: state.NetworkReducer.dataSearch ,
  };
};

const mapDispatchToProps = {
  getNetwork: NetworkActions.getNetwork,
  deleteNetwork: NetworkActions.deleteNetwork,
  getDetail: NetworkActions.getDetailNetwork,
  getDataSearch: NetworkActions.searchNetwork,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Network);
