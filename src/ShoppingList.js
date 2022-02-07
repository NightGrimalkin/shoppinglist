import React, { useEffect, useState } from "react";
import "./ShoppingList.css";
import ListElement from "./ListElement";

function ShoppingList() {
  const [tempNotes, setTempNotes] = useState({
    listElementInput: "",
    listPriceInput: "",
  });
  const [notes, setNotes] = useState([]);
  const [sum, setSum] = useState(0);

  function deleteListElement(e) {
    const index = e.target.getAttribute("indexed");
    let tempNotes = notes;
    tempNotes.splice(index, 1);
    setNotes([...tempNotes]);
  }

  function changeAmount(e) {
    const index = e.target.getAttribute("indexed");
    const name = e.target.name;
    let tempNotes = notes;
    const basePrice = tempNotes[index].listPriceInput / tempNotes[index].amount;
    const sumFix=tempNotes[index].listPriceInput = basePrice * tempNotes[index].amount;
    if (name === "up") {
      tempNotes[index].amount += 1;
      tempNotes[index].listPriceInput = basePrice * tempNotes[index].amount;


      setSum((prevState)=>parseFloat(prevState-sumFix+tempNotes[index].listPriceInput));
      setNotes([...tempNotes]);
    } else if (name === "down" && tempNotes[index].amount != 1) {
      tempNotes[index].amount -= 1;
      tempNotes[index].listPriceInput = basePrice * tempNotes[index].amount;

      
      setSum((prevState)=>parseFloat(prevState-sumFix+tempNotes[index].listPriceInput));
      setNotes([...tempNotes]);
    } else {
      alert("Nie mozesz miec 0 produktów");
    }
    
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
    setSum((prevState)=>parseFloat(+prevState+parseFloat(tempTemporaryNotes.listPriceInput)));
    setTempNotes({
      listElementInput: "",
      listPriceInput: "",
    });
  }
  function sortList() {
    let tempNotes = notes;
    tempNotes.sort(function (a, b) {
      if (a.listElementInput < b.listElementInput) {
        return -1;
      }
      if (a.listElementInput > b.listElementInput) {
        return 1;
      }
      return 0;
    });
    setNotes([...tempNotes]);
  }

  function returnList() {
    const listToReturn = notes.map((value, index) => {
      return (
        <li key={index}>
          {" "}
          <ListElement
            del={deleteListElement}
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
        min={1}
      />
      <button onClick={addToList}>Dodaj</button>
      <button onClick={sortList}>Sortuj</button>
      <div>{returnList()}</div>
      <p>Podsumowanie: {sum}zł</p>
    </div>
  );
}

export default ShoppingList;
