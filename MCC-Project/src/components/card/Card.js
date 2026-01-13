import React from "react";
import "./Card.css";
import { MembershipFormModal } from "../modal";

export const Card = ({ card }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="card">
      <div className="card-color" style={{ background: card.color }} />
      <div className="card-content">
        <div>
          <h2 className="card-title">{card.title}</h2>
          <div className="card-price">
            <span className="price-symbol">$</span>
            <span className="price-value">{card.price} /</span>
            <span className="price-period">month</span>
          </div>
          <div className="divider" />
          {card.texts.map((text, idx) => (
            <div key={idx} className="card-feature">
              <img src="/check.png" alt="check-icon" width={18} height={18} />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <button className="card-button" style={{ "--btn-color": card.color }} onClick={handleOpen}>
          Choose this plan
        </button>
      </div>
      <MembershipFormModal open={open} handleClose={handleClose}/>
    </div>
  );
};
