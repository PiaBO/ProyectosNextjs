'use client';

import Task from './Task';
import { Task as TaskType } from './Task';
import styles from '../styles/Home.module.css';

interface TaskListProps {
  tasks: TaskType[];
  removeTask: (id: number) => void;
}

export default function TaskList({ tasks, removeTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles.tasksSection}>
        <h2>Tasks</h2>
        <p>No tasks yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className={styles.tasksSection}>
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onRemove={removeTask} />
      ))}
    </div>
  );
}