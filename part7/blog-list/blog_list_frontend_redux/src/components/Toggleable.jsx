import { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = ({ children, buttonLabel, ref }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      {visible ? (
        children
      ) : (
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      )}
    </>
  );
};

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
