import clsx from 'clsx';
import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type InputProps = {
  /** Input label */
  label: string;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
  readOnly = false,
  hideError = false,
  validation,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  return (
    <div className='form-group'>
      <div className='label-group'>
        <label htmlFor={id}>{label}</label>
        {validation?.required && (
          <span className='text-xs text-red-500'>&nbsp;*</span>
        )}
      </div>
      <div
        className={`input-group pw ${type === 'password' && !passwordShown ? 'pw pw-hidden' : 'pw pw-shown'
          }`}
      >
        <input
          {...register(id, validation)}
          {...rest}
          type={type === 'password' && passwordShown ? 'text' : type}
          name={id}
          id={id}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
              : errors[id]
                ? 'border-red-500'
                : 'border-gray-500',
            'block w-full rounded-md shadow-sm'
          )}
          placeholder={placeholder}
          aria-describedby={id}
          autoComplete='on'
        />
        {type === 'password' && !errors[id] && (
          <span
            onClick={() => setPasswordShown(!passwordShown)}
            className='pw-toggle'
          >
            Show Password
          </span>
        )}
        {helperText && !errors[id] && (
          <p className='input-helper-text text-gray-500'>{helperText}</p>
        )}
        {!hideError && errors[id] && (
          <div className='pointer-events-none absolute right-0 top-2 flex items-center pr-2'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
        {!hideError && errors[id] && (
          <span cy-marker='form-input-error' className='text-red-500'>{errors[id].message}</span>
        )}
      </div>
    </div>
  );
}
