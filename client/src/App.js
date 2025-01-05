import React,{Fragment} from 'react';
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

function App() {
  return (
    <Fragment>
      <div name="container" style={{margin: "0 auto", width:"50%"}}>
        <InputTodo/>
        <ListTodo/>
      </div>
    </Fragment>
  );
}

export default App;
