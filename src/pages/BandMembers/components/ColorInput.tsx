import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const Input: React.FC<{
  id: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}> = (props) => {
  const error = props.errors[props.name];

  return (
    <div className={`relative flex justify-center items-center pb-[28px]`}>
      <input
        {...props.register(props.name, {
          required: {
            value: true,
            message: 'ველი სავალდებულოა',
          },
        })}
        type='color'
        id={props.id}
        name={props.name}
        className={` w-40 h-[54px] px-2 py-1 bg-white border border-member-card-blue rounded-md text-center outline-none relative ${
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
