import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div
        className={`container ${alert.type} mt-20px p-1-10px`}
        key={alert.id}
      >
        <h5 className="center-align valign-wrapper">
          <i className="material-icons left medium">info</i> {alert.msg}
        </h5>
      </div>
    ))
  );
};

export default Alerts;
