import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const PropsType = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onComfirm: PropTypes.func
};

const PopupComfirm = ({ open, onClose, onComfirm }) => {
  return (
    <Modal isOpen={open} toggle={onClose} id="exampleModalCenter">
      <ModalHeader toggle={onClose}>Xác nhận</ModalHeader>
      <ModalBody>Bạn có chắc chắn muốn xóa ?</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onComfirm}>
          Xóa
        </Button>
        <Button color="secondary" onClick={onClose}>
          Đóng
        </Button>
      </ModalFooter>
    </Modal>
  );
};
PopupComfirm.propTypes = PropsType;

export default PopupComfirm;
