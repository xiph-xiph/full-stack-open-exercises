import NotificationContext from "../context/NotificationContext";
import { useContext } from "react";

const Notification = () => {
  const [notification, _notificationDispatch] = useContext(NotificationContext);

  const messageStyle = {
    color: notification.isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notification.message) {
    return <div style={messageStyle}>{notification.message}</div>;
  } else {
    return null;
  }
};

export default Notification;
