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

  return (
    <div className={`relative ${!error && 'pb-[20px]'} xs:pb-[28px]`}>
      <input
        {...props.register(props.name, {
          required: {
            value: true,
            message: 'ეს ველი სავალდებულოა',
          },
          minLength: { value: 3, message: 'უნდა შეიყვანოთ მინიმუმ 3 სიმბოლო' },
          pattern:
            props.name === 'nickname'
              ? {
                  value: /^[a-z0-9ა-ჰ]*$/,
                  message: 'მხოლოდ დაბალი რეგისტრი და რიცხვები',
                }
              : undefined,
        })}
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        className={`w-full text-sm bg-input-bg placeholder-placeholder-color px-2 py-4 align-bottom outline-none rounded-sm relative xs:px-5 ${
          error && 'outline-2 outline-error-red outline-offset-0'
        }`}
      />
      {error && (
        <p
          className=' text-[13px] text-red-600 mt-0 ml-2 xs:absolute xs:bottom-1 xs:ml-5'
          data-cy={props.name + '-error'}
        >
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default Input;
