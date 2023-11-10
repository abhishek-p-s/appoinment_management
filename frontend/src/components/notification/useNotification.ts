import { useMemo } from 'react';
import { message } from 'antd';

type Notification = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
};

function useNotification() {
  return useMemo(() => {
    const notify = ({ type, message: msgContent, ...props }: Notification) => {
      message.config({ top: 40 });
      message.open({
        type,
        content: msgContent,
        style: { textAlign: 'center' },
        ...props,
      });
    };
    return { notify };
  }, []);
}

export default useNotification;
