import React from 'react';
import { ListItem } from './components/ListItem';
import { TaskField } from './components/TaskField';
import MicrophoneIcon from './components/MicrophoneIcon';
import MicrophoneIconRN from './components/MicrophoneIconRN';

function App() {
  const [tasks, setTasks] = React.useState([
    {
      text: 'Изучить ReactJS',
      completed: true,
    },
    {
      text: 'Разработать ToDo на ReactJS',
      completed: false,
    },
  ]);

  const onToggleCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, curIdx) =>
        index === curIdx
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const onRemoveTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, curIdx) => index !== curIdx));
  };

  const onAddTask = (text) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        text,
        completed: false,
      },
    ]);
  };

  return (
    <div className="todo">
      <div className="todo__header">
        <h4>Список задач</h4>
        {/* Example usage of MicrophoneIcon (CSS-based for web) */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
          <MicrophoneIcon size={30} color="#007AFF" />
          <MicrophoneIcon size={40} color="#333" className="recording" />
          <MicrophoneIcon size={35} color="#666" className="muted" />
        </div>
        {/* Example usage of MicrophoneIconRN (React Native style) */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' }}>
          <MicrophoneIconRN size={30} color="#007AFF" />
          <MicrophoneIconRN size={40} color="#333" isRecording={true} />
          <MicrophoneIconRN size={35} color="#666" isMuted={true} />
        </div>
      </div>
      <TaskField onAddTask={onAddTask} />
      <div className="todo__list">
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            index={index}
            text={task.text}
            completed={task.completed}
            onToggleCompleted={onToggleCompleted}
            onRemoveTask={onRemoveTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
