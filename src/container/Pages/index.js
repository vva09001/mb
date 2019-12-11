import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import PageTable from '../../components/page/Table';
import PropTypes from 'prop-types';
import { PageActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from '../../helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getPages: PropTypes.func,
  deletePages: PropTypes.func,
  getDetail: PropTypes.func
};

const ListPage = ({ data, getPages, deletePages, getDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesID, setPagesID] = useState(null);

  useEffect(() => {
    getPages();
  }, [getPages]);

  const { t } = useTranslation();

  const openComfirm = () => {
    if (pagesID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (pagesID !== null) {
      deletePages(pagesID);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/pages/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('Trang')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/pages/create')}>
            {t('create')}
          </Button>
          <Button color="primary" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <PageTable data={data} getID={id => setPagesID(id)} getDetail={onGetDetail} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
};
  
ListPage.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.PageReducer.data };
};

const mapDispatchToProps = {
  getPages: PageActions.GetPages,
  deletePages: PageActions.DeletePages,
  getDetail: PageActions.getDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
