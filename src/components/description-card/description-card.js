import React from 'react';

import { cuttingString } from '../../utilitary/cuttingString';
import './description-card.css';

function DescriptionCard({ overview }) {
  return (
    <div className="card-movie__description">
      <p className="card-movie__description-text">{cuttingString(overview)}</p>
    </div>
  );
}

export default DescriptionCard;
