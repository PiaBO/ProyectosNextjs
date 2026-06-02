'use client';

import styles from '../styles/Home.module.css';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDateTime: Date;
}

interface TaskProps {
  task: Task;
  onRemove: (id: number) => void;
}

export default function Task({ task, onRemove }: TaskProps) {
  return (
    <div className={styles.task}>
      <h2 className={styles.taskTitle}>{task.title}</h2>
      <p className={styles.taskDescription}>{task.description}</p>
      <p className={styles.taskDue}>Due: {task.dueDateTime.toLocaleString()}</p>
      <button onClick={() => onRemove(task.id)} className={styles.removeButton}>
        Remove Task
      </button>
    </div>
  );
}