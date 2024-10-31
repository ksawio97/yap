'use client'

import { randomBytes } from 'crypto';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type detachOnActiveChange = () => void;
type OneActiveContextType = {
  generateId: () => string;
  setNewActive: (id: string | null) => void;
  onActiveChange: (id: string, onChange: (active: boolean) => void) => detachOnActiveChange;
  forceDeactivate: (id: string) => void;
}


const defaultOneActiveContextValue: OneActiveContextType = {
  generateId: () => '',
  setNewActive: () => {},
  // should be used on page load to track not sent changes
  onActiveChange: () => () => {},
  forceDeactivate: () => {},
};

const OptionContext = createContext<OneActiveContextType>(defaultOneActiveContextValue);

export function OneActiveProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const listeners = useRef<Map<string, (active: boolean) => void>>(new Map());  


  const generateId = () => {
    return randomBytes(20).toString('hex');
  }
  // update active state
  const setNewActive = (id: string | null) => {
    setActive(id);
  }
  // fire onChange event
  const activeChange = (active: string | null, id: string, onChange: (active: boolean) => void) => {
    onChange(active === id);
  }
  // add new onChange event
  const onActiveChange = (id: string, onChange: (active: boolean) => void) => {
    listeners.current.set(id, onChange);
    return () => {
      listeners.current.delete(id);
    }
  }
  // when we want to deactivate current and not set new as active
  const forceDeactivate = (id: string) => {
    if (active === id)
      setActive(null);
  }
  // fire active change events
  useEffect(() => {
    listeners.current.forEach((onChange, id) => {
      activeChange(active, id, onChange);
    });
  }, [active]);

  return (
    <OptionContext.Provider value={{ generateId, setNewActive, onActiveChange, forceDeactivate }}>
      {children}
    </OptionContext.Provider>
  );
}

export function useOneActive() {
  return useContext(OptionContext);
}
