import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', timeout: 0 },
  reducers: {
    setNotificationValue (state, action) {
      return { message: action.payload, timeout: state.timeout }
    },
    setNotificationTimeout (state, action) {
      return { message: state.message, timeout: action.payload }
    }
  }
})

export const { setNotificationValue, clearNotification, setNotificationTimeout } = notificationSlice.actions

export const setNotification = (message, duration) => (dispatch, getState) => {
  clearTimeout(getState().notification.timeout)
  dispatch(setNotificationValue(message))
  const timeout = setTimeout(() => dispatch(setNotificationValue('')), duration * 1000)
  dispatch(setNotificationTimeout(timeout))
}

export default notificationSlice.reducer