import { useState, useImperativeHandle } from 'react'

const Toggleable = ({ children, buttonLabel, ref }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  

  return (
    <>
      { visible ? (
        children
      ) : (
        <button onClick={ toggleVisibility }>
          { buttonLabel }
        </button>
      )}
    </>
  )
}

export default Toggleable