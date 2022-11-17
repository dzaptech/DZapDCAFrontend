import { notification } from 'antd';
import iconNotiClose from '../Assets/Icons/noti-close-icon.svg';
import iconNotiTypeError from '../Assets/Icons/noti-type-error.png';
import iconNotiTypeSuccess from '../Assets/Icons/noti-type-success.png';

export const successNotification = (message: string, description: string) => {
  notification.success({
    message: <div className="notification-head -mb-1">{message}</div>,
    description: <div className="notification-message">{description}</div>,
    top: 80,
    closeIcon: <img src={iconNotiClose} alt="close" className="-mt-0.2" />,
    icon: (
      <img
        src={iconNotiTypeSuccess}
        style={{ height: 40, width: 40 }}
        alt="close"
      />
    ),
    style: {
      background: '#2FB378',
      borderRadius: 13,
      height: 60,
      padding: 10,
    },
  });
};
export const errorNotification = (title: string, description: string) => {
  notification.error({
    message: <div className="notification-head -mb-1">{title || 'Error'}</div>,
    description: <div className="notification-message">{description}</div>,
    top: 80,
    closeIcon: <img src={iconNotiClose} alt="close" className="-mt-0.2" />,
    icon: (
      <img
        src={iconNotiTypeError}
        style={{ height: 40, width: 40 }}
        alt="close"
      />
    ),
    style: {
      background: '#F36969',
      borderRadius: 13,
      // height: 60,
      padding: 10,
    },
  });
};
export const warningNotification = (message: string, description: string) => {
  notification.warning({
    message,
    description,
    top: 80,
  });
};

export const extractErrorMessage = (error: any) => {
  let message = '';
  if (error?.reason === 'user rejected transaction') {
    message = 'Whoopsie, Trx Rejected in Wallet! Try Again';
  } else {
    message = error?.error?.data?.message || 'Something went wrong!';
  }
  return message;
};
