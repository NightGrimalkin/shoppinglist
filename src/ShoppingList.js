import React, { useEffect, useState } from "react";
import "./ShoppingList.css";
import ListElement from "./ListElement";

function ShoppingList() {
  const [tempNotes, setTempNotes] = useState({
    listElementInput: "",
    listPriceInput: "",
  });
  const [notes, setNotes] = useState([]);

  function changeAmount(e) {
    const index = e.target.getAttribute("indexed");
    const name = e.target.name;
    let tempNotes = notes;
    const basePrice = tempNotes[index].listPriceInput / tempNotes[index].amount;
    if (name === "up") {
      console.log("jest");
      tempNotes[index].amount += 1;
      tempNotes[index].listPriceInput = basePrice * tempNotes[index].amount;
    } else if (name === "down" && tempNotes[index].amount != 1) {
      console.log("nie");
      tempNotes[index].amount -= 1;
      tempNotes[index].listPriceInput = basePrice * tempNotes[index].amount;
    } else {
      alert("Nie mozesz miec 0 produktów");
    }
    setNotes([...tempNotes]);
  }

  const handleInputChange = (e) => {
    setTempNotes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function addToList() {
    let tempTemporaryNotes = tempNotes;
    let temporaryNotes = notes;
    temporaryNotes.push({
      listElementInput: tempTemporaryNotes.listElementInput,
      listPriceInput: tempTemporaryNotes.listPriceInput,
      amount: 1,
    });
    setNotes(temporaryNotes);
    setTempNotes({
      listElementInput: "",
      listPriceInput: "",
    });
  }

  function returnList() {
    const listToReturn = notes.map((value, index) => {
      return (
        <li key={index}>
          {" "}
          <ListElement
            number={index}
            index={index + 1}
            changeAmount={changeAmount}
            text={value.listElementInput}
            price={value.listPriceInput}
            amount={value.amount}
          />
        </li>
      );
    });
    return <ul>{listToReturn}</ul>;
  }

  return (
    <div>
      <input
        placeholder="Przedmiot:"
        type="text"
        name="listElementInput"
        onChange={handleInputChange}
        value={tempNotes.listElementInput}
      />
      <input
        placeholder="Cena:"
        type="number"
        name="listPriceInput"
        onChange={handleInputChange}
        value={tempNotes.listPriceInput}
      />
      <button onClick={addToList}>Dodaj</button>
      <div>{returnList()}</div>
    </div>
  );
}

export default ShoppingList;
