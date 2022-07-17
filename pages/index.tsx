import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import React, { useEffect, useState } from "react";
import { streamListItems } from "../lib/firestore";
import Section from "../components/section";
import { actions, TOBUY_PROXY, TODO_PROXY, useItems } from "../lib/item-store";
import panda from "../public/panda.png"

const Main: NextPage = () => {

  const toBuyItems = useItems(TOBUY_PROXY)
  const todoItems = useItems(TODO_PROXY)

  const [error, setError] = useState(null);
  const [mode, setMode] = useState("dark")

  useEffect(() => {
    const unsubscribe = streamListItems(TOBUY_PROXY,
        (querySnapshot) => {
            actions.syncChanges(TOBUY_PROXY,querySnapshot.docChanges())
        },
        (error) => setError("item-list-get-fail")
    );
    return unsubscribe;
  });

  useEffect(() => {
    const unsubscribe = streamListItems(TODO_PROXY,
        (querySnapshot) => {
            actions.syncChanges(TODO_PROXY,querySnapshot.docChanges())
        },
        (error) => setError("item-list-get-fail")
    );
    return unsubscribe;
  });

  const onModeToggle = () => {
    const newMode = mode === "dark"? "" : "dark"
    setMode(newMode);
  }

  return (
    <div className={mode}>
      <Head>
        <title>DF</title>
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <body className="bg-gradient-to-b from-pink-300 to-pink-200 dark:bg-black dark:from-black dark:to-black h-screen">
        <div className="flex justify-center items-center flex-row pt-10 pb-10">
          <h1 className="h-1 text-rose-50 dark:text-slate-300 title-text text-4xl" onClick={onModeToggle}> DON'T FORGET </h1>
        </div>
        {mode !== "dark" && <div className="flex justify-center items-center flex-row"><Image objectFit="contain" src={panda}></Image></div>}
        <div className="flex flex-col items-center">
          <div className="items-center">
            <Section items={toBuyItems} proxyName={TOBUY_PROXY} heading={"To Buy"} expandTitle={"Bought"}></Section>
          </div>
          <br></br>
          <div className="items-center">
            <Section items={todoItems} proxyName={TODO_PROXY} heading={"To Do"} expandTitle={"Done"}></Section>
          </div>
        </div>
      </body>
    </div>
  )
}

export default Main