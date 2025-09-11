import { useSelector } from "react-redux";

import Alert from "@mui/material/Alert";

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const isError = useSelector((state) => state.notification.isError);

  const alertProps = {
    severity: isError ? "error" : "success",
    variant: isError ? "filled" : "outlined",
  };

  if (message) {
    return <Alert {...alertProps}>{message}</Alert>;
  } else {
    return null;
  }
};

export default Notification;
