import { notification } from 'antd';

notification.config({
    duration: 2
});
export default (type, message) => {
    notification[type]({
        message
    });
};