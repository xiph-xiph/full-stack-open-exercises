import PropTypes from "prop-types";

const Notification = ({ message, isError = false }) => {
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

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool,
};

export default Notification;
