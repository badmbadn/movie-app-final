import React from 'react';
import './description-card.css';

function cuttingString(str) {
  const text = str.slice(0, 100);
  const a = text.split(' ');
  a.splice(a.length - 1, 1);
  const res = a.join(' ');
  return `${res}...`;
}

function DescriptionCard({ overview }) {
  return (
    <div className="card-movie__description">
      <p className="card-movie__description-text">{cuttingString(overview)}</p>
    </div>
  );
}

export default DescriptionCard;
