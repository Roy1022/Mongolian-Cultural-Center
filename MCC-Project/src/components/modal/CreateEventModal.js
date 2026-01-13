import React, { useState } from 'react'
import './CreateEventModal.css'

export const CreateEventModal = ({ isOpen, onClose, onCreateEvent, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required')
      return
    }

    onCreateEvent(formData)
    setFormData({ title: '', description: '', date: '', location: '' })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Event</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="modal-input"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="6"
            className="modal-textarea"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="modal-input"
          />

          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={formData.location}
            onChange={handleInputChange}
            className="modal-input"
          />

          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="modal-button modal-button-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="modal-button modal-button-submit"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
