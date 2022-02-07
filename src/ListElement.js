import React from "react";
import './ListElement.css';

function ListElement(props) {
  return (
    <div className="listElement" >
      <p>Nr: {props.index} &nbsp;</p>
      <input type="checkbox" className="check"/>
      <p>Produkt: {props.text} &nbsp;</p>
      <p>Cena: {props.price}zł &nbsp;</p>
      <p>Ilość: {props.amount} &nbsp;</p>
      <button onClick={props.changeAmount} name="up" indexed={props.number}>
        +
      </button>
      <button onClick={props.changeAmount} name="down" indexed={props.number}>
        -
      </button>
    </div>
  );
}

export default ListElement;
