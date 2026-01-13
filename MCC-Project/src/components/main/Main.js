import React from "react";
import { Card } from "../card";
import "./Main.css";
export const Main = () => {
  const cards = [
    {
      title: "Bronze",
      texts: [
        "Full access to all private spots",
        "Regular updates with new stuff",
        "Free admission to select events",
        "Access to MCCN events",
      ],
      color: "#D3B07C",
      price: 5,
    },
    {
      title: "Silver",
      texts: [
        "Full access to all private spots",
        "Regular updates with new stuff",
        "Free admission to select events",
        "Access to MCCN events",
        "Free admission to select events",
      ],
      color: "#B0B0B0",
      price: 10,
    },
    {
      title: "Gold",
      texts: [
        "Full access to all private spots",
        "Regular updates with new stuff",
        "Free admission to select events",
        "Access to MCCN events",
        "Special member-only activities",
        "Early registration for events",
        "Get to be as a role model",
      ],
      color: "#FCE674",
      price: 20,
    },
  ];
  return (
    <div className="main-container">
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </div>

  );
};
