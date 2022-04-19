import { useState } from 'react';

function ButtonIncrement(props) {
  
   return (
     <button onClick={props.onClickFunc}> Add </button>
   )
}

function Display(props) {
  return (
    <label style={{ marginLeft: '.10rem'}} >{props.message}</label>
  )
}

function App() {
  const [counter, setCounter] = useState(1);
  const incrementCounter = () => setCounter(counter + 1);


  return (
    <div> 
      <ButtonIncrement onClickFunc={incrementCounter}/>
      <p>Quantity: </p>
      <Display message={counter}/> 
    </div>
  );
}

export default App;