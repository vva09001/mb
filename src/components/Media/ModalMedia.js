import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import SeleteMedia from '../../container/media/selectMedia';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const PropsType = {
 setState: PropTypes.func
};
function ModalMedia({setState}) {
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
      <div>
        <Button onClick={openModal}>{t('SeleteImage')}</Button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
          <SeleteMedia closeModal={closeModal} />
        </Modal>
      </div>
    </React.Fragment>
  );
}

ModalMedia.propTypes = PropsType;

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
export default ModalMedia;
