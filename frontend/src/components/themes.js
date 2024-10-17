import React from "react";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Themes() {
  const themes = [
    "bg-theme1",
    "bg-theme2",
    "bg-theme3",
    "bg-theme4",
    "bg-theme5",
    "bg-theme6",
  ];

  const themes2 = [
    "bg-theme7",
    "bg-theme8",
    "bg-theme9",
    "bg-theme10",
    "bg-theme11",
    "bg-theme12",
    "bg-theme13",
    "bg-theme14",
  ];
  const handleToggle = () => {
    $(".right-sidebar").toggleClass("right-toggled");
  };

  return (
    <div className="right-sidebar">
      <div className="switcher-icon" onClick={handleToggle}>
        <FontAwesomeIcon icon="fa-solid fa-gears" />
      </div>
      <div className="right-sidebar-content">
        <p className="mb-0">Gaussion Texture</p>
        <hr />

        <ul className="switcher">
          {themes.map((item, idx) => (
            <li key={idx}
              id={`theme${idx + 1}`}
              onClick={() => {
                $("body").attr("class", item);
              }}
            />
          ))}
        </ul>

        <p className="mb-0">Gradient Background</p>
        <hr />

        <ul className="switcher">
          {themes2.map((item, idx) => (
            <li key={idx}
              id={`theme${idx + 7}`}
              onClick={() => {
                $("body").attr("class", item);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
