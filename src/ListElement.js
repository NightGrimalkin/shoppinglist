import React from "react";
import './ListElement.css';

function ListElement(props) {
  return (
    <div className="listElement">
      <input type="checkbox" />
      <p>{props.text}</p>
      <p>{props.amount}</p>
      <button onClick={props.changeAmount} id="up">
        +
      </button>
      <button onClick={props.changeAmount} id="down">
        -
      </button>
    </div>
  );
}

export default ListElement;
