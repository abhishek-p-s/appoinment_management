import { useMemo } from 'react';
import { notification } from 'antd';

type Notification = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description: string;
};

function useAlerts() {
  return useMemo(() => {
    const alert = ({ type, message, description, ...props }: Notification) => {
      notification.config({ placement: 'topRight', duration: 3, top: 10 });
      notification.open({
        type,
        message,
        description,
        ...props,
      });
    };
    return { alert };
  }, []);
}

export default useAlerts;
