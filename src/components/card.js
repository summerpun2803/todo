import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container,Box,Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { Delete, Update } from '../store/taskSlice';


const SimpleCard = ({ todo }) => {
    
    const dispatch = useDispatch();

    const [completed, setCompleted] = useState(todo.status);

    const handleToggle = async() => {
        setCompleted(!completed); // Toggle the completion state

        try {
            await fetch(`http://localhost:8000/tasks/${todo.id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: !completed                 })
            });
            const newTodo = {
                id: todo.id,
                task: todo.task,
                status: !todo.status
            }
            dispatch(Update(newTodo));
        } catch (error) {
            console.error("Error updating task status:", error);
            
        }
    };

    const handleClick = async () => {
        console.log(todo.id);
        await fetch('http://localhost:8000/tasks/' + todo.id , {
            method:"DELETE"
        })
        dispatch(Delete(todo.id));
    }
    return (
        <Container>
      <Card
        className="root"
        variant="outlined"
        style={{ marginTop: 35, background: "lightgray" }}
      >
        <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="h2">
                {todo.task}
            </Typography>
            <Checkbox checked={completed} onChange={handleToggle} />
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClick}>
                Delete
            </Button>
                        
        </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SimpleCard;
