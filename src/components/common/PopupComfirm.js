import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onComfirm: PropTypes.func
};

const PopupComfirm = ({ open, onClose, onComfirm }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={open} toggle={onClose} id="exampleModalCenter">
      <ModalHeader toggle={onClose}>{t('confirm')}</ModalHeader>
      <ModalBody>{t('questionConfirm')}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onComfirm}>
          {t('delete')}
        </Button>
        <Button color="secondary" onClick={onClose}>
          {t('close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
PopupComfirm.propTypes = PropsType;

export default PopupComfirm;
