import NotificationProvider from "./NotificationProvider";
import UserProvider from "./UserProvider";

const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <UserProvider>{children}</UserProvider>
    </NotificationProvider>
  );
};

export default ContextProvider;
