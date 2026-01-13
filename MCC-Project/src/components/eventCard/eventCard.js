import React from 'react'
import './eventCard.css'

export const EventCard = ({ id, image, title, date, location, onClick }) => {
  return (
    <div className="event-card-small" onClick={() => onClick(id)}>
      <div className="event-card-small-image">
        <img src={image || 'https://via.placeholder.com/300x200?text=Event'} alt={title} />
      </div>
      
      <div className="event-card-small-content">
        <h3 className="event-card-small-title">{title}</h3>
        
        <div className="event-card-small-meta">
          {date && <span className="event-card-small-date">📅 {date}</span>}
          {location && <span className="event-card-small-location">📍 {location}</span>}
        </div>
      </div>
    </div>
  )
}
