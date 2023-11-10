import React, { memo } from 'react';
import { Layout } from '..';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex justify-center align-middle mt-5">
        <p className="text-xl text-primary">Sorry Page Not Found !</p>
      </div>
    </Layout>
  );
};

export default memo(NotFound);
