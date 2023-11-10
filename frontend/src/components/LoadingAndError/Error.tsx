import React, { memo } from 'react';
import { Alert, Space } from 'antd';

type Error = {
  description: any;
};

const Error: React.FC<Error> = ({ description }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} className="mt-5">
      <Alert
        message={`Error ${description?.status}`}
        description={description?.data?.errors[0]?.msg}
        type="error"
        showIcon
      />
    </Space>
  );
};

export default memo(Error);
