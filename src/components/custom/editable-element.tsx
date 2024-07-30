'use client';

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface EditableElementProps {
  placeholder?: string;
  value: string;
  name: string;
  onValueChange?: (data: {
    name: string;
    value: string;
    index: number;
  }) => void;
  className?: string;
  index?: number;
}

export default function EditableElement({
  placeholder,
  value,
  name,
  onValueChange,
  className,
  index = 0,
}: EditableElementProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(!value);

  const handleBlur = useCallback(() => {
    const newValue = contentRef.current?.innerText.trim() ?? '';
    setIsEmpty(!newValue);

    if (newValue !== placeholder && newValue !== value) {
      onValueChange?.({ name, value: newValue, index });
    }
  }, [name, onValueChange, placeholder, value, index]);

  const handleInput = useCallback(() => {
    const newValue = contentRef.current?.innerText.trim() ?? '';
    setIsEmpty(!newValue);
  }, []);

  return (
    <div
      data-text-cond={!isEmpty}
      data-text={value}
      className={cn(
        'inline-block cursor-text group',
        'hover:outline-dashed hover:outline-1 hover:outline-[#77858d]',
        'focus-within:outline-dashed focus-within:outline-1 focus-within:outline-[#77858d]',
        className,
      )}
    >
      <div
        ref={contentRef}
        contentEditable={true}
        onBlur={handleBlur}
        onInput={handleInput}
        className={cn(
          'bg-transparent border-none p-0 m-0',
          'text-gray-600 focus:outline-none resize-none w-full',
          'focus:ring-0 focus:ring-offset-0',
          'empty:before:content-[attr(data-placeholder)]',
          'empty:before:text-gray-400',
        )}
        suppressContentEditableWarning={true}
        role="textbox"
        aria-label={name}
        data-placeholder={placeholder}
      >
        {value}
      </div>
    </div>
  );
}
