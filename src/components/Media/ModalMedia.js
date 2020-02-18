import React, { useState } from 'react';
import { Button } from 'reactstrap';
import SeleteMedia from '../../container/media/selectMedia';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
  setState: PropTypes.func
};
function ModalMedia({ setState }) {
  const [modalIsOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    setModalOpen(!modalIsOpen);
  };

  const closeModal = () => {
    setModalOpen(!modalIsOpen);
    setState();
  };

  return (
    <React.Fragment>
      <Button size="sm" color="primary" onClick={openModal}>
        {t('SeleteImage')}
      </Button>
      <Modal isOpen={modalIsOpen} toggle={closeModal} size="lg" className='restyleModal'>
        <ModalBody>
          <SeleteMedia />
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={closeModal}>
            {t('SeleteImage')}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

ModalMedia.propTypes = PropsType;

export default ModalMedia;
