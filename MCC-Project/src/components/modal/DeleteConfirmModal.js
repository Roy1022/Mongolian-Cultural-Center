import React from 'react';
import './Modal.css';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, eventTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Event</h2>
        <p>Are you sure you want to delete "{eventTitle}"?</p>
        <p className="delete-warning">This action cannot be undone.</p>
        <div className="modal-actions">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

