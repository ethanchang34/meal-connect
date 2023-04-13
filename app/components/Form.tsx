"use client";
import { useState, useEffect } from "react";

export default function Form() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({
    caesar_rodney: false,
    pencader: false,
    russell: false,
  });

  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const selectAll = (value) => {
    setCheckedAll(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };

  useEffect(() => {
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  return (
    <form className="bg-white my-8 p-8 rounded-md">
      <label className="text-xl font-bold">Choose a location</label>
      <div className="mb-1">
        <input
          id="caesar_Rodney"
          type="checkbox"
          name="chk"
          onChange={() => toggleCheck("caesar_rodney")}
          checked={checked["caesar_rodney"]}
        />
        <label> Caesar Rodney</label>
      </div>
      <div className="mb-1">
        <input
          id="pencader"
          type="checkbox"
          name="chk"
          onChange={() => toggleCheck("pencader")}
          checked={checked["pencader"]}
        />
        <label> Pencader</label>
      </div>
      <div className="mb-1">
        <input
          id="russell"
          type="checkbox"
          name="chk"
          onChange={() => toggleCheck("russell")}
          checked={checked["russell"]}
        />
        <label> Russell</label>
      </div>
      <div className="mb-1">
        <input
          id="select_all"
          type="checkbox"
          name="chk"
          onChange={(event) => selectAll(event.target.checked)}
          checked={checkedAll}
        />
        <label> All of the above</label>
      </div>
    </form>
  );
}
