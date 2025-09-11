import { useState, useImperativeHandle } from "react";
import { Button } from "@mui/material";
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
        <Button variant="outlined" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      )}
    </>
  );
};

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
