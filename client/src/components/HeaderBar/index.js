import React, { useRef, useEffect } from "react";
import "./HeaderBar.scss";
import { FaUsers } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";
import { TweenMax, Power3 } from "gsap";

export default function HeaderBar(props) {
  let icon = useRef(null);
  let title = useRef(null);

  useEffect(() => {
    TweenMax.from(icon, 1, { x: -100, ease: Power3.easeOut });
    TweenMax.from(title, 1, { x: 100, ease: Power3.easeOut });
  }, []);

  return (
    <div className="hb">
      <div className="hb-employee-icon" ref={(el) => (icon = el)}>
        {props.page === "EmployeeList" ? <FaUsers /> : <AiFillFolderOpen />}
      </div>
      <div className="hb-vert-separator"></div>
      <h1 className="hb-title" ref={(el) => (title = el)}>
        {props.title}
      </h1>
    </div>
  );
}
