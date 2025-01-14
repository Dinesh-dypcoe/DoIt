export const loadState = () => {
  try {
    const authState = localStorage.getItem('authState');
    const tasksState = localStorage.getItem('tasksState');
    
    return {
      auth: authState ? JSON.parse(authState) : undefined,
      tasks: tasksState ? JSON.parse(tasksState) : undefined
    };
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem('authState', JSON.stringify(state.auth));
    localStorage.setItem('tasksState', JSON.stringify(state.tasks));
  } catch (err) {
    console.error('Error saving state:', err);
  }
}; 