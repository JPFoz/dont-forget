import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import { getListItems, streamListItems } from '../lib/firestore';
import Section from '../components/section';
import { actions, useItems } from '../lib/item-store';

const Main: NextPage = () => {

  const toBuyItems = useItems()
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = streamListItems('to-buy',
        (querySnapshot) => {
            actions.syncChanges(querySnapshot.docChanges())
            // const updatedListItems = 
            // querySnapshot.docs.map(docSnapshot => docSnapshot.data());
            // console.log(updatedListItems);
            // actions.syncItems(updatedListItems)
        },
        (error) => setError('item-list-get-fail')
    );
    return unsubscribe;
  });

  return (
    <div>
      <Head>
        <title>DF</title>
        <link rel='icon' href='../../public/favicon.ico' />
      </Head>
      <h1 className="h-1 text-slate-300 mt-20 mb-10 title-text text-4xl flex items-center justify-center"> DONT FORGET </h1>
      <div className="items-center ml-5">
        <Section items={toBuyItems} heading={'To Buy'}></Section>
      </div>
    </div>
  )
}

export default Main