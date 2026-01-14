import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as InitialData from '../constants';

// Define the shape of our content based on constants
type ContentType = typeof InitialData;

interface ContentContextType {
  content: ContentType;
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateContent: (section: keyof ContentType, path: string | (string | number)[], value: any) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(InitialData);
  const [isEditMode, setIsEditMode] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_content_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge saved data with initial structure to ensure new fields in constants don't break app
        setContent((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load content", e);
      }
    }
  }, []);

  // Save to local storage whenever content changes
  useEffect(() => {
    if (JSON.stringify(content) !== JSON.stringify(InitialData)) {
        localStorage.setItem('portfolio_content_v1', JSON.stringify(content));
    }
  }, [content]);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const resetContent = () => {
    if (window.confirm('모든 수정사항을 초기화하고 기본 내용으로 되돌리시겠습니까?')) {
      setContent(InitialData);
      localStorage.removeItem('portfolio_content_v1');
      window.location.reload();
    }
  };

  const updateContent = (section: keyof ContentType, path: string | (string | number)[], value: any) => {
    setContent((prev) => {
      const newSection = Array.isArray(prev[section]) 
        ? [...(prev[section] as any[])] 
        : { ...(prev[section] as any) };

      // Helper to update nested object/array by path
      const pathArray = Array.isArray(path) ? path : path.split('.');
      let current = newSection;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        const key = pathArray[i];
        if (current[key] === undefined) return prev; // Invalid path protection
        
        // If we are traversing, we need to clone the next level to maintain immutability
        if (Array.isArray(current[key])) {
            current[key] = [...current[key]];
        } else if (typeof current[key] === 'object') {
            current[key] = { ...current[key] };
        }
        current = current[key];
      }
      
      const lastKey = pathArray[pathArray.length - 1];
      current[lastKey] = value;

      return {
        ...prev,
        [section]: newSection,
      };
    });
  };

  return (
    <ContentContext.Provider value={{ content, isEditMode, toggleEditMode, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};