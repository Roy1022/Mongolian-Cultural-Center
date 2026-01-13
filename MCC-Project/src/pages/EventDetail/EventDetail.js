import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { eventAPI, getToken, getUser } from '../../services/api'
import { UpdateEventModal, DeleteEventModal } from '../../components/modal'
import './EventDetail.css'

export const EventDetail = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const user = getUser()
  const token = getToken()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventAPI.getEvent(eventId, token)
        if (data?._id) {
          setEvent(data)
        } else {
          setError('Event not found')
        }
      } catch (err) {
        setError('Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, token])

  const canEditOrDelete = user && (user.isAdmin || event?.ownerId === user.id)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await eventAPI.deleteEvent(eventId, token)
      navigate('/events')
    } catch (err) {
      setError('Failed to delete event')
      setIsDeleting(false)
    }
  }

  const handleUpdateEvent = async (formData) => {
    try {
      const updated = await eventAPI.updateEvent(eventId, formData, token)
      setEvent(updated)
      setIsUpdateModalOpen(false)
    } catch (err) {
      setError('Failed to update event')
    }
  }

  if (loading) {
    return <div className="event-detail-loading">Loading...</div>
  }

  if (error || !event) {
    return (
      <div className="event-detail-error">
        <p>{error || 'Event not found'}</p>
        <button
          onClick={() => navigate('/events')}
          className="event-detail-back-btn"
        >
          Back to Events
        </button>
      </div>
    )
  }

  return (
    <div className="event-detail-container">
      <button
        onClick={() => navigate('/events')}
        className="event-detail-back-btn"
      >
        ← Back to Events
      </button>

      <div className="event-detail-card">
        <div className="event-detail-header">
          <div className="event-detail-title-section">
            <h1 className="event-detail-title">{event.title}</h1>
            <p className="event-detail-creator">
              Created by: {event.userName}
            </p>
          </div>

          {user && user.isVerified && (
            <div className="event-detail-menu-wrapper">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="event-detail-menu-btn"
                title="More options"
              >
                ⋮
              </button>

              {showMenu && (
                <div className="event-detail-menu-dropdown">
                  {canEditOrDelete ? (
                    <>
                      <button
                        onClick={() => {
                          setIsUpdateModalOpen(true)
                          setShowMenu(false)
                        }}
                        className="event-detail-menu-item event-detail-menu-edit"
                        title="Edit this event"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() => {
                          setShowDeleteConfirm(true)
                          setShowMenu(false)
                        }}
                        className="event-detail-menu-item event-detail-menu-delete"
                        title="Delete this event"
                      >
                        🗑️ Delete
                      </button>
                    </>
                  ) : (
                    <div className="event-detail-menu-disabled">
                      <p>You can only edit or delete your own events</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="event-detail-error-message">{error}</div>
        )}

        <div className="event-detail-meta">
          {event.date && (
            <div className="event-detail-meta-item">
              📅 {event.date}
            </div>
          )}
          {event.location && (
            <div className="event-detail-meta-item">
              📍 {event.location}
            </div>
          )}
        </div>

        <div className="event-detail-description">
          {event.description}
        </div>

        {event.createdAt && (
          <div className="event-detail-date-created">
            Created on:{' '}
            {new Date(event.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <DeleteEventModal
          isOpen={showDeleteConfirm}
          eventTitle={event.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={isDeleting}
        />
      )}

      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        event={event}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdateEvent={handleUpdateEvent}
      />
    </div>
  )
}
