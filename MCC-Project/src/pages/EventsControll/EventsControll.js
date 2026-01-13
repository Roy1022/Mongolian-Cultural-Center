import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventCard } from '../../components/eventCard'
import { CreateEventModal } from '../../components/modal/CreateEventModal'
import { eventAPI, getToken, getUser, authAPI } from '../../services/api'
import './EventsControll.css'

export const EventsControll = () => {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [creatingEvent, setCreatingEvent] = useState(false)
  const [showMyPostsOnly, setShowMyPostsOnly] = useState(false)

  const user = getUser()
  const token = getToken()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await eventAPI.getEvents(token)
        if (Array.isArray(data)) {
          setEvents(data)
        } else {
          setEvents([])
        }
      } catch (err) {
        setError('Failed to load events')
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [token])

  const handleCreateEvent = async (formData) => {
    setCreatingEvent(true)
    try {
      const result = await eventAPI.createEvent(
        formData.title,
        formData.description,
        formData.date,
        formData.location,
        token,
        user
      )

      if (result?._id) {
        setEvents(prev => [result, ...prev])
        setIsModalOpen(false)
      }
    } catch (err) {
      if (err.message?.includes('verified')) {
        setError('Your account needs to be verified to create events. Contact admin.')
      } else {
        setError('Failed to create event')
      }
    } finally {
      setCreatingEvent(false)
    }
  }

  const handleCardClick = (eventId) => {
    navigate(`/event/${eventId}`)
  }

  const handleLogout = () => {
    authAPI.logout()
    window.location.reload()
  }

  const handleCreateClick = () => {
    if (!user || !token) return
    if (!user.isVerified) {
      setError('Your account needs to be verified to create events. Contact admin.')
      return
    }
    setIsModalOpen(true)
  }

  const filteredEvents = showMyPostsOnly
    ? events.filter(event => event.ownerId === user?.id)
    : events

  return (
    <div className="events-container">
      <div className="events-header">
        <div className="events-title-section">
          <h1 className="events-title">Events</h1>
          {user && <p className="events-subtitle">Welcome, {user.username}</p>}
        </div>

        <div className="events-actions">
          {user ? (
            <>
              {user.isVerified && (
                <button
                  onClick={handleCreateClick}
                  className="events-add-btn"
                >
                  + Add Event
                </button>
              )}
              <button
                onClick={handleLogout}
                className="events-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="events-add-btn"
            >
              Create an Account
            </button>
          )}
        </div>
      </div>

      {error && <div className="events-error">{error}</div>}

      {user && user.isVerified && (
        <div className="events-filter-section">
          <button
            onClick={() => setShowMyPostsOnly(!showMyPostsOnly)}
            className={`events-filter-btn ${showMyPostsOnly ? 'active' : ''}`}
          >
            {showMyPostsOnly ? '✓ My Posts' : 'All Events'}
          </button>

          <p className="events-filter-count">
            {showMyPostsOnly
              ? `${filteredEvents.length} of ${events.length} events`
              : `Showing all ${events.length} events`}
          </p>
        </div>
      )}

      {loading ? (
        <div className="events-loading">Loading events...</div>
      ) : (
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                date={event.date}
                location={event.location}
                image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                onClick={handleCardClick}
              />
            ))
          ) : (
            <div className="events-empty">
              <p>
                {showMyPostsOnly
                  ? "You haven't created any events yet."
                  : 'No events yet.'}
              </p>
            </div>
          )}
        </div>
      )}

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateEvent={handleCreateEvent}
        loading={creatingEvent}
      />
    </div>
  )
}
