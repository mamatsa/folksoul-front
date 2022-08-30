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
        value: 2,
        message: 'უნდა შეიყვანოთ მინიმუმ 2 სიმბოლო',
      },
    },
    link: {
      pattern: {
        value: new RegExp(
          '^(https?:\\/\\/)' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
          'i'
        ),
        message: 'უნდა შეიყვანოთ ვალიდური ბმული',
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
          props.name === 'link' ? 'w-[500px]' : 'w-64'
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
