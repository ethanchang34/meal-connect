"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Form() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState({
    caesar_rodney: false,
    pencader: false,
    russell: false,
  });
  const [time, setTime] = useState({
    start: "",
    end: "",
  });
  let toastPostID: string;

  const toggleCheck = (inputName: string) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName as keyof typeof prevState] =
        !prevState[inputName as keyof typeof prevState];
      return newState;
    });
  };

  // Check or uncheck all when selecting "select all"
  const selectAll = (value: boolean) => {
    setCheckedAll(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName as keyof typeof prevState] = value;
      }
      return newState;
    });
  };

  // Effect to control checkedAll state
  // If you check both individually, it will activate the checkedAll state
  // If you uncheck any individaully, it will deactivate the checkedAll state
  useEffect(() => {
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName as keyof typeof checked] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  //Submit Form
  const { mutate } = useMutation(
    async (checked: {
      caesar_rodney: boolean;
      pencader: boolean;
      russell: boolean;
    }) => await axios.post("/api/posts/submitForm", { checked }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID }); //Pop-up error msg
        }
        // setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Form has been submitted!", { id: toastPostID });
        // setTitle("");
        // setIsDisabled(false);
      },
    }
  );
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault(); //prevents refreshing onSubmit
    toastPostID = toast.loading("Submitting your form", { id: toastPostID }); // For some reason, this doesn't go away
    // setIsDisabled(true);
    mutate(checked);
  };

  return (
    <form onSubmit={submitForm} className="bg-white my-8 p-8 rounded-md">
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
      <div className="mb-4">
        <input
          id="select_all"
          type="checkbox"
          name="chk"
          onChange={(event) => selectAll(event.target.checked)}
          checked={checkedAll}
        />
        <label> All of the above</label>
      </div>
      <label className="text-xl font-bold">Meetup time</label>
      <div className="mt-1 mb-4">
        <input
          className="py-1 px-1 mr-4 rounded border-solid bg-gray-300"
          type="time"
          id="start_time"
          name="time"
          onChange={(event) => {
            const newTime = { ...time };
            newTime["start"] = event.target.value;
            setTime(newTime);
          }}
        />
        <input
          className="py-1 px-1 rounded border-solid bg-gray-300"
          type="time"
          id="end_time"
          name="time"
          onChange={(event) => {
            const newTime = { ...time };
            newTime["end"] = event.target.value;
            setTime(newTime);
          }}
        ></input>
      </div>
      <button
        //   disabled={isDisabled}
        className="text-sm bg-teal-600 text-white py-2 px-4 rounded disabled:opacity-25"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
