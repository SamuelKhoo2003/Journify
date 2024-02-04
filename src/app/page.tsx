'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import WelcomePage from "./hello"
import HobbyPage from "./hobby"
import JournalPage from "./journal"
import Dashboard from "./dashboard";
import Insights from "./insights"
import OldJournals from "./old-journals"
import ScrollDownButton from "@/components/ui/ScrollDownButton";
import ColorChanger from "./color-changer";
export default function Home() {
  const [nextSection, setNextSection] = useState('hobby');
  // const [isShaking, setIsShaking] = useState(false);
  const handleScroll = () => {
    // Obtain the current scroll position
    const scrollPosition = window.pageYOffset;

    // Get all section elements
    const sections = Array.from(document.querySelectorAll('.section'))
      .filter(section => section.offsetTop >= (scrollPosition + 100))
      .sort((a, b) => a.offsetTop - b.offsetTop);
    if (sections.length > 0) {
      if (sections[0].id !== nextSection) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 1000);
      }
      setNextSection(sections[0].id)
      console.log(nextSection)
    }
  };

  // Add and remove the scroll event listener when the component mounts/unmounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextSection]);
  return (
    //flex min-h-screen flex-col items-center justify-between pb-24
    <main className="flex-col w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      {nextSection !== "newlast" ? <ScrollDownButton targetId={nextSection} /> : <div></div>}
      <WelcomePage />
      <HobbyPage />
      <JournalPage />
      <Dashboard />
      <Insights />
      {/* <ColorChanger />
      <OldJournals/> */}
      <div className="bg-animation">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
    </main>
  );
}
