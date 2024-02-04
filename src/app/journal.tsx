'use client'
import React, { useMemo } from 'react';
import dynamic from "next/dynamic";

const journal = () => {
  // this allows you to show a little loading thing while you wait for the import
  // also, this editor is only works on the client, so ssr is false to not server side render it
  // (i think that's what it does, i'm not 100% sure <- co-pilot suggested this)
  const TextEditor = useMemo(() => {
    return dynamic(() => import("../components/ui/text-editor"), {
      loading: () => <p>loading...</p>,
      ssr: false,
    });
  }, []);

  return (
    <div id="journal" className="flex min-h-screen flex-col items-center justify-between .h-screen w-4/5">
      <div id="jj" className="section align-top"></div>
      <div className="">
        <h2 className='text-4xl pr-2 mb-5'>What is on your mind?</h2>
        <div className="text-xl text-center border-blue-300 border-2 bg-slate-900 p-5 py-4 mb-5 rounded-lg"> Your journal entry is auto saved.</div>
        <TextEditor />
      </div>
      <div></div>
    </div>
  );
};

export default journal;
