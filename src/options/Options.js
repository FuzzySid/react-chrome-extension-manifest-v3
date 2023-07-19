import React, { useState } from 'react';

function Options() {
  const [counter,setCounter] = useState(0)
  return (
    <>
      <h1>This is the options page</h1>
      {/* <button onClick={()=>setCounter(counter+1)}>Increment</button>
      {counter} */}
    </>
  );
}

export default Options;
