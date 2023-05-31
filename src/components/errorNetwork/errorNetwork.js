import React from 'react';
import { Alert } from 'antd';
// eslint-disable-next-line import/no-unresolved
import { Offline } from 'react-detect-offline';
import './errorNetwork.css';

const ErrorNetwork = (
  <Offline>
    <Alert type="warning" message="sadness" description="problem  with internet" showIcon className="offline" />
  </Offline>
);

export default ErrorNetwork;
