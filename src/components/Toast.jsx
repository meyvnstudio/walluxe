import React, { useState, useEffect } from "react";

import "./../style/component.scss";

const Toast = ({ message, show, duration }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration || 3000); // Default duration is 3 seconds

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    visible && (
      <div className="toast">
        <span className="toast-message">{message}</span>
      </div>
    )
  );
};

export default Toast;
