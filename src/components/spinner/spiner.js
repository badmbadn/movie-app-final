import React from 'react';
import { Spin } from 'antd';
import './spiner.css';

function Spiner() {
  return (
    <div className="inner-spinner">
      <Spin size="large" />
    </div>
  );
}
export default Spiner;
