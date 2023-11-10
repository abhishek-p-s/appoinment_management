import React, { memo } from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => {
  return (
    <div className="mt-[6rem]">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default memo(Loading);
