import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import MailTable from '../../components/Mail/Table';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from '../../helpers/history';
import { connect } from 'react-redux';

const PropsType = {
  data: PropTypes.array,
  getMails: PropTypes.func,
  deleteMails: PropTypes.func,
  getDetail: PropTypes.func
};

const ListMail = ({ data, getMails, deleteMails, getDetail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mailsID, setmailsID] = useState(null);

  useEffect(() => {
    getMails();
  }, [getMails]);

  const { t } = useTranslation();

  const openComfirm = () => {
    if (mailsID !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onDelete = () => {
    if (mailsID !== null) {
      deleteMails(mailsID);
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetail(detail);
    history.push('/emails/edit');
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('Email')}</h4>
        </Row>
        <Row className="mb-2">
          <Button color="primary" className="mr-2" onClick={() => history.push('/emails/create')}>
            {t('create')}
          </Button>
          <Button color="primary" className="mr-2" onClick={openComfirm}>
            {t('delete')}
          </Button>
        </Row>
        <Row style={{ background: '#fff' }} className="p-3">
          <MailTable data={data} getID={id => setmailsID(id)} getDetail={onGetDetail} />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
};

ListMail.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.MailReducer.data };
};

const mapDispatchToProps = {
  getMails: MailActions.GetMails,
  deleteMails: MailActions.DeleteMails,
  getDetail: MailActions.getDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMail);
