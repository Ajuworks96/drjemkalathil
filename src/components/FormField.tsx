import React from 'react';

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  hint,
  children,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <span>{label}</span>
        {required && <span className="form-required">* Required</span>}
      </label>
      {children}
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && (
        <span id={`${id}-error`} className="form-error-msg" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
