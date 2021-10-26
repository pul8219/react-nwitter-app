import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const querySnapshot = await getDocs(collection(dbService, 'nweets'));
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
    // console.log(querySnapshot);
  };

  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'nweets'), {
      nweet,
      createdAt: Date.now(),
    });

    setNweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  console.log(nweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
