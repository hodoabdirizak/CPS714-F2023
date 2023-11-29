import React, { useState } from 'react';
import Modal from 'react-modal';
import './DeleteAccount.css';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {

  const modalStyle = {
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={onClose}
      contentLabel="Delete Account Confirmation"
    >
      <h2>Are you sure you want to delete your account?</h2>
      <div className='delete-account'>
        <button className='delete_account-confirm-btn' onClick={onConfirm}>Yup, delete my account.</button>
        <button className='delete_account-cancel-btn' onClick={onClose}>Nah, I'm good.</button>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;