import { ref } from 'vue';
import axios from 'axios';

export const useTasks = () => {
  const tasks = ref([]);
  const loading = ref(false);

  const fetchTasks = async (params = {}) => {
    loading.value = true;
    try {
      const res = await axios.post('/task/fetch', params);
      tasks.value = res.data.data || []; // <-- sets tasks
      return res.data; // <--- return the whole response
    } catch (err) {
      console.error('Failed fetching tasks', err);
      return { error: err.response?.data || err.message };
    } finally {
      loading.value = false;
    }
  };

  const addTask = async (task) => {
    const res = await axios.post('/task/store', task);
    // tasks.value.push(res.data.task);
    tasks.value = [...tasks.value, res.data.task];
  };

  const updateTask = async (id, payload) => {
    const res = await axios.patch(`/task/update/${id}`, payload);
    const index = tasks.value.findIndex(t => t.id === id);
    if (index !== -1) tasks.value[index] = res.data.task;
  };

  const deleteTask = async (id) => {
    await axios.delete(`/task/delete/${id}`);
    tasks.value = tasks.value.filter(t => t.id !== id);
  };

  const updateOrder = async () => {
    // Send the updated order to backend
    for (let i = 0; i < tasks.value.length; i++) {
      await updateTask(tasks.value[i].id, { order: i + 1 });
    }
  };

  return { tasks, loading, fetchTasks, addTask, updateTask, deleteTask, updateOrder };
};
