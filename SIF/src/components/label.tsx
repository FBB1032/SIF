import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...props} className={`font-medium text-sm ${props.className || ''}`}>
      {children}
    </label>
  );
};