import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const Input: React.FC<{
  type: string;
  id: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}> = (props) => {
  const error = props.errors[props.name];

  const validations = {
    name: {
      minLength: {
        value: 3,
        message: 'უნდა შეიყვანოთ მინიმუმ 3 სიმბოლო',
      },
      pattern: {
        value: /^[ა-ჰ]*$/,
        message: 'შეიყვანე ქართულად',
      },
    },
    instrument: {
      minLength: {
        value: 2,
        message: 'მინიმუმ 2 სიმბოლო',
      },
      pattern: {
        value: /^[ა-ჰ]*$/,
        message: 'შეიყვანე ქართულად',
      },
    },
    orbitWidth: {
      pattern: {
        value: /^[1-9]*$/,
        message: 'უნდა იყოს რიცხვი',
      },
    },

    color: {
      validate: {
        startsCorrectly: (value: string) =>
          value.startsWith('#') || 'უნდა იწყებოდეს # -ით',
        hasProperLength: (value: string) =>
          value.length === 7 || 'უნდა იყოს 7 სიმბოლო',
        containsValidChars: (value: string) =>
          /^#([a-fA-F0-9]{6})$/.test(value) || 'დაუშვებელი სიმბოლოები',
        inUpperCase: (value: string) =>
          value === value.toLocaleUpperCase() || 'არაა მაღალ რეგისტრში',
      },
    },
  };

  return (
    <div className={`relative flex justify-center items-center pb-[28px]`}>
      <input
        {...props.register(props.name, {
          required: {
            value: true,
            message: 'ველი სავალდებულოა',
          },
          ...validations[props.name as keyof typeof validations],
        })}
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        className={` ${
          props.name === 'name' ? 'w-72' : 'w-40'
        } text-sm placeholder-placeholder-gray py-4 border border-member-card-blue rounded-md text-center outline-none relative xs:px-5 ${
          error && 'outline-1 border-none outline-error-red outline-offset-0'
        }`}
      />
      {error && (
        <p className='text-xs text-red-600 xs:absolute xs:bottom-1'>
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
