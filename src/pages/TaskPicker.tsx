import { FormEventHandler, useState } from 'react'
import '../App.css'

import { Modal, Box, createTheme, ThemeProvider } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { grey } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: grey[700],
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

interface Task {
  text: string,
  weight: number,
}

function TaskPicker() {
  const [open, setOpen] = useState(false);
  
  const [tasks, setTasks] = useState<Task[]>([]);

  const [inputTask, setInputTask] = useState<string>('');
  const [inputWeight, setInputWeight] = useState<number>(1);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    addTask(inputTask, inputWeight);
    console.log('this is the tasks: ', tasks) 
  }

  const addTask = (text: string, weight: number) => {
    setTasks([...tasks, {text, weight}]);
  }
  const removeTask = (index: number) => {
    let tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    console.log(tasksCopy);
    setTasks(tasksCopy);
  }
  const recommendTask = (tasks: Task[]): string => {
    const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
    const randomWeight = Math.random() * totalWeight;
  
    let cumulativeWeight = 0;
    for (const task of tasks) {
      cumulativeWeight += task.weight;
      if (randomWeight < cumulativeWeight) {
        return task.text;
      }
    }
    return tasks.length > 0 ? tasks[0].text : "No tasks available";
  }


  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <h1>Task Picker</h1>

      <div>
        <button onClick={handleOpen} style={{backgroundColor: '#f57f17'}}>Recommend a Task</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Try doing the following: <h2 style={{color: '#f57f17'}}>{recommendTask(tasks)}</h2></h3>
            <hr/>
            <p>remove from list when complete.</p>
          </Box>
        </Modal>
      </div>

      <div style={{border: 'thin solid grey', margin: '15px', padding: '10px'}}>
        {tasks.length == 0 && <h4 style={{margin: '30px'}}>Add a task to populate list</h4>}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              < div style={{display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', marginBottom: '4px'}}>
                <p>{task.text}</p>
                <p>{task.weight}</p>
                <button onClick={() => removeTask(index)}><DeleteForeverIcon /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form className='card' id='taskWeightForm' onSubmit={handleSubmit}>
        <input type='text' placeholder='Insert task' onChange={(e) => setInputTask(e.target.value)} style={{fontSize: '17px'}}/>
        <input type='number' min={1} max={10} onChange={(e) => setInputWeight(e.target.valueAsNumber)} style={{fontSize: '17px'}}></input>
        <button type='submit'>Add Task</button>
      </form>
      </ThemeProvider>
    </>
  )
}

export default TaskPicker
