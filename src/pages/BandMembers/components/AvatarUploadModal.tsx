import React, { useState, useRef, useEffect } from 'react';
import { ExitButton } from 'components';
import { putMemberAvatarRequest } from 'services/backendRequests';

const AvatarUploadModal: React.FC<{
  closeModal: (avatarAdded?: boolean) => void;
  memberId: string;
}> = ({ closeModal, memberId }) => {
  const [fileIsUploaded, setFileIsUploaded] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [preview, setPreview] = useState('');
  const hiddenInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // create the preview
    if (fileIsUploaded) {
      const objectUrl = URL.createObjectURL(uploadedImage!);
      setPreview(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [uploadedImage, fileIsUploaded]);

  // Redirect button click to hidden fle input
  const uploadFileHandler = () => {
    hiddenInput.current!.click();
  };

  // On image upload
  const handleFileInputChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFileIsUploaded(true);
      setUploadedImage(uploadedFile);
    }
  };

  // Send backend request
  const acceptUpload = async () => {
    try {
      await putMemberAvatarRequest(memberId, uploadedImage);
    } catch (e) {
      console.log(e);
    }
    closeModal(true);
  };

  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-modal-bg bg-opacity-95 flex justify-center items-center z-10'>
      <div className='relative bg-white py-20 rounded-lg flex flex-col items-center justify-between gap-20'>
        <ExitButton closeHandler={closeModal} />
        <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-lg mb-2'>შეცვალე ჯგუფის წევრის ავატარი</h2>
          <div className='h-[1px] w-5/6 bg-gray-400 -mx-10'></div>
        </div>
        <div className='relative w-56 h-56 mx-52 rounded-full overflow-hidden bg-member-card-blue  border border-white flex justify-center items-center shadow-icon'>
          {<img src={preview} alt='' className='w-full h-auto' />}
        </div>

        <form>
          <input
            ref={hiddenInput}
            onChange={handleFileInputChange}
            type='file'
            id='image'
            name='image'
            className=' hidden'
          />
        </form>

        {fileIsUploaded ? (
          <button
            type='submit'
            className='button bg-button-green text-content-white rounded-lg text-lg px-6 pt-2 pb-1 tracking-wide'
            onClick={acceptUpload}
          >
            შეინახე
          </button>
        ) : (
          <button
            type='submit'
            className='button bg-member-card-blue text-content-white rounded-lg text-lg px-6 pt-2 pb-1 tracking-wide'
            onClick={uploadFileHandler}
          >
            ატვირთე
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarUploadModal;
