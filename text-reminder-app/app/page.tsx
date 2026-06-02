'use client';

import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { Task } from '../components/Task';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const addTask = () => {
    if (!title || !description || !dueDate || !dueTime) {
      alert('Please fill in all fields');
      return;
    }

    const dueDateTime = new Date(`${dueDate}T${dueTime}:00`);
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDateTime,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    tasks.forEach((task) => {
      const timeDiff = task.dueDateTime.getTime() - Date.now();
      if (timeDiff > 0 && !completedTasks.has(task.id)) {
        const timer = setTimeout(() => {
          alert(`⏰ Reminder: "${task.title}" is due now!`);
          setCompletedTasks((prev) => {
            const next = new Set(prev);
            next.add(task.id);
            return next;
          });
        }, timeDiff - 60_000); // 1 minuto antes
        timers.push(timer);
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [tasks, completedTasks]);

  return (
    <div className={styles.container}>
      <span className={styles.header}>
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20240320180346/gfg(1).png"
          alt="Logo"
          className={styles.logo}
        />
        <h1 className={styles.title}>Task Reminder App</h1>
      </span>

      <input type="text" className={styles.input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" className={styles.input} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" className={styles.input} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <input type="time" className={styles.input} value={dueTime} onChange={(e) => setDueTime(e.target.value)} />

      <button onClick={addTask} className={styles.button}>Add Task</button>

      <TaskList
        tasks={[...tasks].sort((a, b) => a.dueDateTime.getTime() - b.dueDateTime.getTime())}
        removeTask={removeTask}
      />
    </div>
  );
}