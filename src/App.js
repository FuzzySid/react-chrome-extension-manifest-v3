import React, { useEffect, useState } from "react";
import "./App.css";

// analytics.track('chrome extension test 2');

/*global chrome*/

function App() {

  const [inputData,setInputData] = useState('')
  const [names,setNames] = useState([])

  const handleChange = e => setInputData(e.target.value)

  function openNewTab() {
    const newUrl = 'https://google.com'; // Replace with the URL you want to open
  
    // Use the chrome.tabs API to create a new tab with the specified URL
    chrome.tabs.create({ url: newUrl }, (tab) => {
      console.log('New tab created:', tab);
    });
  }

  // Function to handle button click event for saving data
  function saveData() {
    const data = inputData;
    const newNames = [...names,data]
    // Use the chrome.storage.sync API to save data
    chrome.storage.sync.set({ savedData: (newNames) }, () => {
      console.log('Data saved:', data);
      setNames([...newNames])
    });
  }

  // Function to handle button click event for retrieving data
  function retrieveData() {
    // Use the chrome.storage.sync API to retrieve data
    chrome.storage.sync.get(['savedData'], (result) => {
      console.log("result",result)
      const data = result.savedData;
      setNames([...data])
    });
  }

  // Function to handle button click event for clearing data
  // function clearData() {
  //   // Use the chrome.storage.sync API to clear all data
  //   chrome.storage.sync.clear(() => {
  //     console.log('Data cleared.');
  //   });
  // }

  useEffect(()=>{
    retrieveData()
  },[])

  return (
    <div className="App">
        <button onClick={openNewTab}>Open a new tab</button>
        <div>
          <input value={inputData} placeholder="enter your name" type="text" onChange={handleChange} />
          <button onClick={saveData}>Add name to the list</button>
        </div>
        <div>
          {names.map(name => <p key={name}>{name}</p>)}
        </div>

    </div>
  );
}

export default App;
