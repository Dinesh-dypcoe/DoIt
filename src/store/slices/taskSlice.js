import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all', // 'all', 'today', 'important', 'planned', 'assigned'
  activeNav: 'all'
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTaskImportant: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.important = !Boolean(task.important);
      }
    },
    toggleTaskCompleted: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    assignTask: (state, action) => {
      const { taskId, userId, userName } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.assignedTo = { id: userId, name: userName };
      }
    },
    setTaskDueDate: (state, action) => {
      const { taskId, dueDate } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.dueDate = dueDate;
      }
    },
    setTaskReminder: (state, action) => {
      const { taskId, reminder } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.reminder = reminder;
      }
    },
    setTaskRepeat: (state, action) => {
      const { taskId, repeat } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.repeat = repeat;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setActiveNav: (state, action) => {
      state.activeNav = action.payload;
      state.filter = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addTask, 
  removeTask, 
  toggleTaskImportant,
  toggleTaskCompleted,
  assignTask,
  setTaskDueDate,
  setTaskReminder,
  setTaskRepeat,
  setFilter,
  setActiveNav,
  setTasks, 
  setLoading, 
  setError 
} = taskSlice.actions;

export default taskSlice.reducer; 