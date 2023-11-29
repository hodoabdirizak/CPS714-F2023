import React, { useState } from 'react';
import Modal from 'react-modal';
import './DeleteAccountModal.css';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Account Confirmation"
    >
      <h2>Are you sure you want to delete your account?</h2>
      <button onClick={onConfirm}>Yup, delete my account.</button>
      <button onClick={onClose}>Nah, I'm good.</button>
    </Modal>
  );
};

export default DeleteAccountModal;