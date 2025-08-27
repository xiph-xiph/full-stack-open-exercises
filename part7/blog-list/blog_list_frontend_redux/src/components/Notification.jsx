import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const isError = useSelector((state) => state.notification.isError);

  const messageStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message) {
    return <div style={messageStyle}>{message}</div>;
  } else {
    return null;
  }
};

export default Notification;
