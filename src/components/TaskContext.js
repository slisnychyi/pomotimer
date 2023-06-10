import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  return (
    <TaskContext.Provider value={{ selectedTaskId, setSelectedTaskId }}>
      {children}
    </TaskContext.Provider>
  );
};
