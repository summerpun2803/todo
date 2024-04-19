import React, { useEffect } from "react";
import { Input } from '@mui/base/Input';
import Form from "./components/form";
import useFetch from "./useFetch";
import SimpleCard from "./components/card";
import { useSelector } from "react-redux";


const App = () => {
  const { error } = useFetch('http://localhost:8000/tasks');

  const todos = useSelector(state => state.task.value);
  return ( 
    <div>
      <header className="app_header">
        <Form />
      </header>
      <div>
      {todos.map(todo => (
          <SimpleCard key={todo.id} todo={todo} />))}
      </div>
    </div>

   );
}
 
export default App;