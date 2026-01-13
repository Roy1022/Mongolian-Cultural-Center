import React from 'react'
import './DeleteEventModal.css'

export const DeleteEventModal = ({ isOpen, eventTitle, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <div className="delete-modal-header">
          <h2>Delete Event</h2>
        </div>

        <div className="delete-modal-body">
          <p className="delete-modal-message">
            Are you sure you want to delete <strong>"{eventTitle}"</strong>?
          </p>
          <p className="delete-modal-warning">
            This action cannot be undone.
          </p>
        </div>

        <div className="delete-modal-buttons">
          <button
            onClick={onCancel}
            className="delete-modal-button-cancel"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="delete-modal-button-confirm"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Event'}
          </button>
        </div>
      </div>
    </div>
  )
}
