import React, { useState, useEffect } from 'react'
import './UpdateEventModal.css'

export const UpdateEventModal = ({ isOpen, event, onClose, onUpdateEvent }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        location: event.location || '',
      })
    }
  }, [event, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required')
      return
    }

    setIsLoading(true)
    try {
      await onUpdateEvent(formData)
    } catch (err) {
      setError(err.message || 'Failed to update event')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <div className="update-modal-header">
          <h2>Edit Event</h2>
          <button
            className="update-modal-close"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="update-modal-form">
          {error && (
            <div className="update-modal-error">{error}</div>
          )}

          <div className="update-modal-field">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="update-modal-input"
            />
          </div>

          <div className="update-modal-field">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              className="update-modal-textarea"
              rows="5"
            ></textarea>
          </div>

          <div className="update-modal-field">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g., December 25, 2025"
              className="update-modal-input"
            />
          </div>

          <div className="update-modal-field">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              className="update-modal-input"
            />
          </div>

          <div className="update-modal-buttons">
            <button
              type="button"
              onClick={onClose}
              className="update-modal-button-cancel"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="update-modal-button-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
