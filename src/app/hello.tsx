"use client"
import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from 'react';
import { jumpToSection } from "@/Helpers/Helper";
import { initLocalstorage } from '../Helpers/Helper'
import './globals.css';
import 'animate.css';


const WelcomePage = () => {
  const [name, setName] = useState('');
  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName == undefined) {
      initLocalstorage();
      window.setTimeout(() => document.getElementById('nameInput')?.focus(), 0);
    } else if (storedName.length > 0 && storedName != name) {
      console.log("NAME ALREADY EXISTS IN LOCALSTORAGE")
      setName(storedName);
      submitName(storedName);
      setTimeout(function()
      {
        jumpToSection("hobby")
      }, 1500);
    }
  }, [name]);
  //check if name is in localstorage when page loads
  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value);
    localStorage.setItem('name', e.target.value.toString());
  };
  function isEnterKeyPressed(event: KeyboardEvent): boolean {
    return event.key === "Enter";
  }

  function submitName(thename: string) {
    console.log("Submitted")
    let nameInput = document.getElementById("nameInput");
    if (nameInput != null) nameInput.value = thename
    if (nameInput != null) nameInput.className = "animate__animated animate__bounce flex h-12 w-full rounded-md bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:none text-blue-300 text-4xl focus-visible:ring-0";
    nameInput?.blur();
  }
  // Example usage:
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    let nameInput = document.getElementById("nameInput");
    if (isEnterKeyPressed(event) && event.target === nameInput) {
      (nameInput as HTMLInputElement).disabled = false;
      jumpToSection("hobby")
      submitName(name)
    }
  });
  return (
    <div className="flex min-h-screen flex-col items-center justify-between w-1/2">
      <div></div>
      <div className="flex row items-center flex-shrink justify-center w-2/3">
        <div className="col-md-6 text-4xl flex-grow" style={{ color: '#D9C4B3', fontSize: "48px"}}>
          <p className="pb-3">
            Welcome to <span style={{ color: '#E5E7EB', fontWeight: 'bold' }}>Journify</span>,

          </p>
          <Input
            id="nameInput"
            className="flex justify-center h-12 flex-shrink px-8 border-0 border-blue-300 rounded-md bg-transparent px-3 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-light placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:none text-blue-300 text-4xl focus-visible:ring-0"
            placeholder="your name ..."
            autoComplete="off"
            onChange={handleInputChange}
            style={{ color: '#8E7A61'}}
            />
        </div>
        <div className="col-md-6"></div>     {/* Don't remove this */}
      </div>
      <div></div>
    </div>

  )
};

export default WelcomePage;