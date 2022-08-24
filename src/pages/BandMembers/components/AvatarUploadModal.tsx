import React from 'react';
import { MemberIcon, ExitButton } from 'components';

const AvatarUploadModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-modal-bg bg-opacity-95 flex justify-center items-center z-10'>
      <div className='relative bg-white py-20 rounded-lg flex flex-col items-center justify-between gap-20'>
        <ExitButton closeHandler={closeModal} />
        <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-lg mb-2'>შეცვალე ჯგუფის წევრის ავატარი</h2>
          <div className='h-[1px] w-5/6 bg-gray-400 -mx-10'></div>
        </div>
        <div className='relative w-56 h-56 mx-52 rounded-full bg-member-card-blue  border border-white flex justify-center items-center shadow-icon'>
          <div className=' scale-150'>
            <MemberIcon />
          </div>
        </div>
        <button
          type='submit'
          className='button bg-member-card-blue text-content-white rounded-lg text-lg px-6 pt-2 pb-1 tracking-wide'
        >
          ატვირთე
        </button>
      </div>
    </div>
  );
};

export default AvatarUploadModal;
