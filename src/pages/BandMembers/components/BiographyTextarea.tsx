import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

const Textarea: React.FC<{
  register: UseFormRegister<any>;
  errors: FieldErrors;
}> = (props) => {
  const error = props.errors['bio'];

  return (
    <div
      className={
        'relative w-full flex flex-col justify-center items-center pb-[28px]'
      }
    >
      <textarea
        id='bio'
        rows={10}
        {...props.register('bio', {
          required: {
            value: true,
            message: 'ველი სავალდებულოა',
          },
          pattern: {
            value: /^[ა-ჰ\s]*$/,
            message: 'დაშვებულია მხოლოდ ქართული ასოები',
          },
        })}
        className={`w-full text-sm placeholder-placeholder-gray p-4 border border-member-card-blue rounded-md outline-none xl:w-[120%] ${
          error && 'outline-1 border-none outline-error-red outline-offset-0'
        }`}
        placeholder='ბიოგრაფია'
      />
      {error && (
        <p className='text-xs text-red-600 xs:absolute xs:bottom-1'>
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default Textarea;
