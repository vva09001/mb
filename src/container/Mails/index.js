import React, { useEffect, useState } from 'react';
import { Row, Button } from 'reactstrap';
import MailTable from '../../components/Mail/Table';
import PropTypes from 'prop-types';
import { MailActions } from '../../store/actions';
import { useTranslation } from 'react-i18next';
import PopupComfirm from '../../components/common/PopupComfirm';
import history from '../../helpers/history';
import { connect } from 'react-redux';
import useBulkSelect from '../../hooks/useBulkSelect';
import { map } from 'lodash';

const PropsType = {
  data: PropTypes.array,
  getMails: PropTypes.func,
  deleteMails: PropTypes.func,
  getDetailMails: PropTypes.func
};

function ListMail({ data, getMails, deleteMails, getDetailMails }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mailsID, setmailsID] = useState(null);

  const mailIds = map(data, values => {
    return values.id;
  });

  const {
    selectedItems,
    isSelectedItem,
    isAllSelected,
    toggleSelectedItem,
    toggleIsAllSelected,
    isIndeterminate
  } = useBulkSelect(mailIds);

  useEffect(() => {
    getMails();
  }, [getMails]);

  const { t } = useTranslation();

  const openComfirm = () => {
    if (selectedItems !== null) {
      setIsOpen(!isOpen);
    }
  };

  const onGetDetail = detail => {
    getDetailMails(detail);
    history.push('/emails/edit');
  };

  const onDelete = () => {
    if (selectedItems !== null) {
      deleteMails(selectedItems);
      setIsOpen(!isOpen);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <h4>{t('email.email')}</h4>
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
          <MailTable
            data={data}
            getID={id => setmailsID(id)}
            getDetail={onGetDetail}
            isSelectedItem={isSelectedItem}
            isAllSelected={isAllSelected}
            toggleSelectedItem={toggleSelectedItem}
            toggleIsAllSelected={toggleIsAllSelected}
            isIndeterminate={isIndeterminate}
          />
        </Row>
      </div>
      <PopupComfirm open={isOpen} onClose={() => setIsOpen(!isOpen)} onComfirm={onDelete} />
    </React.Fragment>
  );
}

ListMail.propTypes = PropsType;

const mapStateToProps = state => {
  return { data: state.MailReducer.data };
};

const mapDispatchToProps = {
  getMails: MailActions.GetMails,
  getDetailMails: MailActions.GetDetailMails,
  deleteMails: MailActions.DeleteMails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListMail);
