import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: "", isError: false, timeout: 0 },
  reducers: {
    setNotificationValue(state, action) {
      return {
        message: action.payload.message,
        isError: action.payload.isError,
        timeout: state.timeout,
      };
    },
    setNotificationTimeout(state, action) {
      return {
        message: state.message,
        isError: state.isError,
        timeout: action.payload,
      };
    },
  },
});

export const { setNotificationValue, setNotificationTimeout } =
  notificationSlice.actions;

export const setNotification =
  (message, isError, duration = 3) =>
  (dispatch, getState) => {
    clearTimeout(getState().notification.timeout);
    dispatch(setNotificationValue({ message, isError }));
    const timeout = setTimeout(
      () => dispatch(setNotificationValue({ message: "", isError: false })),
      duration * 1000,
    );
    dispatch(setNotificationTimeout(timeout));
  };

export default notificationSlice.reducer;
