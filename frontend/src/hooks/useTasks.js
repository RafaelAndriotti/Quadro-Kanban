import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (taskData) => {
    try {
      await api.createTask(taskData);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const changeStatus = async (id, status) => {
    const completedAt = status === 'done' ? new Date().toISOString() : null;
    try {
      await api.updateTaskStatus(id, status, completedAt);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (id, desc, observacao) => {
    try {
      await api.updateTaskDetails(id, desc, observacao);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const removeTask = async (id) => {
    try {
      await api.deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return { tasks, loading, addTask, changeStatus, editTask, removeTask };
};
