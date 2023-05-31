import React from 'react';
import { Tabs } from 'antd';

function Tab({ switchTabs }) {
  return (
    <Tabs
      defaultActiveKey="1"
      className="tabs"
      centered
      onChange={switchTabs}
      destroyInactiveTabPane
      items={[
        {
          label: 'Search',
          key: '1',
        },
        {
          label: 'Rated',
          key: '2',
        },
      ]}
    />
  );
}

export default Tab;
