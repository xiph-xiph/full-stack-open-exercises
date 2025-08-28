import { useReducer, useRef } from "react";
import NotificationContext from "./NotificationContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        message: action.payload.message,
        isError: action.payload?.isError ?? false,
      };
    case "CLEAR":
      return {
        message: "",
        isError: false,
      };
    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(reducer, {
    message: "",
    isError: false,
  });

  const timeoutRef = useRef();

  const setNotification = (message, isError) => {
    notificationDispatch({
      type: "SET",
      payload: {
        message,
        isError,
      },
    });

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      notificationDispatch({
        type: "CLEAR",
      });
    }, 5000);
  };

  return (
    <NotificationContext value={[notification, setNotification]}>
      {children}
    </NotificationContext>
  );
};

export default ContextProvider;
