import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, Container } from '@mui/material';
import { useState } from 'react';
import { Add } from '../store/taskSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';


const Form = () => {
    const [task, setTask] = useState();
    const [error, setError] = useState();
    const dispatch = useDispatch();
    
    const handleChange = (event) => {
        setTask(event.target.value);
    };

    const handleSubmit = async() => {
        // console.log(task);
        if (!task) {
            setError("enter something");
            return;
        }
        const id = uuidv4();;
        const res = await fetch('http://localhost:8000/tasks', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id , task, status: false})
        });
        console.log(res);
        const todo = {
            id,
            task,
            status: false
        }
        
        dispatch(Add(todo));
        setTask("");
    };

    return ( 
        <Container  maxWidth="sm" style={{ marginTop: '20px' }}>
            <FormControl fullWidth={true}>
                <TextField 
                    value={task} 
                    onChange={handleChange} 
                    variant="outlined" 
                    label="Enter Task" 
                />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    ADD
                </Button>
                {{ error } && <div>{error}</div>}
            </FormControl>
        </Container>
     );
}
 
export default Form;