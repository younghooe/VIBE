import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';

interface EditableProps {
  section: string;
  field: string | (string | number)[]; // Path to the data (e.g., "role" or ["0", "title"])
  multiline?: boolean;
  className?: string;
  as?: any; // Tag name (h1, p, span, etc.)
  placeholder?: string;
  children?: React.ReactNode; // Fallback or initial content if needed
}

const Editable: React.FC<EditableProps> = ({ 
  section, 
  field, 
  multiline = false, 
  className = '', 
  as: Component = 'span',
  placeholder,
  children 
}) => {
  const { content, isEditMode, updateContent } = useContent();
  
  // Resolve value from content using path
  const getValue = () => {
    const pathArray = Array.isArray(field) ? field : field.split('.');
    let current = (content as any)[section];
    for (const key of pathArray) {
      if (current === undefined) return '';
      current = current[key];
    }
    return current;
  };

  const [value, setValue] = useState(getValue());

  useEffect(() => {
    setValue(getValue());
  }, [content, section, field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    updateContent(section as any, field, e.target.value);
  };

  if (isEditMode) {
    return multiline ? (
      <textarea
        value={value}
        onChange={handleChange}
        className={`w-full bg-yellow-50/50 border border-yellow-300 rounded p-2 focus:ring-2 focus:ring-yellow-400 outline-none resize-y min-h-[1em] ${className}`}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()} // Prevent triggering parent clicks
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={`w-full bg-yellow-50/50 border border-yellow-300 rounded px-2 py-1 focus:ring-2 focus:ring-yellow-400 outline-none ${className}`}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <Component className={className}>
      {value || children}
    </Component>
  );
};

export default Editable;