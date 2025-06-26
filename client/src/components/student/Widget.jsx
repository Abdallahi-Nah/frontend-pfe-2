import React from "react";
import "./Widget.scss";

const Widget = ({ title, counter, icon }) => {
  return (
    <>
      <div className="widget">
        <div className="left">
          <span className="title">{title}</span>
          <span className="counter">{counter}</span>
        </div>
        <div className="right">
          <div className="percentage"></div>
          {icon}
        </div>
      </div>
    </>
  );
};

export default Widget;
