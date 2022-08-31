import React, { useState, useRef, useEffect } from 'react';
import { ExitButton } from 'components';

const ImageUploadModal: React.FC<{
  closeModal: () => void;
  imageUploadHandler: (image?: File) => void;
  imageUrl: string | undefined;
  title: string;
  page?: string;
}> = (props) => {
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [preview, setPreview] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const hiddenInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (uploadedImage) {
      if (
        uploadedImage.type !== 'image/png' &&
        uploadedImage.type !== 'image/jpg' &&
        uploadedImage.type !== 'image/jpeg' &&
        uploadedImage.type !== 'image/svg+xml'
      ) {
        setErrorMessage('სურათი უნდა იყოს PNG, JPG, JPEG ან SVG ფორმატში');
      } else if (uploadedImage.size > 3145728) {
        setErrorMessage('სურათი უნდა იყოს 2 მეგაბაიტზე მცირე ზომის');
      } else {
        setErrorMessage('');
      }

      // create image preview
      const objectUrl = URL.createObjectURL(uploadedImage!);
      setPreview(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [uploadedImage]);

  // Redirect button click to hidden fle input
  const uploadFileHandler = () => {
    hiddenInput.current!.click();
  };

  // On image upload
  const handleFileInputChange = (event: any) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setUploadedImage(uploadedFile);
    }
  };

  // Send backend request
  const acceptUpload = () => {
    props.imageUploadHandler(uploadedImage);
  };

  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-modal-bg bg-opacity-95 flex justify-center items-center z-10'>
      <div className='relative bg-white py-20 rounded-lg flex flex-col items-center justify-between gap-10'>
        <div
          className='absolute top-4 right-4 cursor-pointer'
          onClick={() => {
            props.closeModal();
          }}
        >
          <ExitButton />
        </div>
        <div className='w-full flex flex-col justify-center items-center'>
          <h2 className='text-lg mb-2'>{props.title}</h2>
          <div className='h-[1px] w-5/6 bg-gray-400 -mx-10'></div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div
            className={`relative w-56 h-56 mx-52 rounded-full overflow-hidden flex justify-center items-center ${
              props.page === 'about'
                ? 'bg-about-purple drop-shadow-thin border-[7px] border-about-purple'
                : `bg-member-card-blue shadow-small border ${
                    errorMessage ? 'border-error-red' : 'border-white'
                  }`
            }`}
          >
            {uploadedImage && (
              <img src={preview} alt='' className='w-full h-auto' />
            )}
            {!uploadedImage && props.imageUrl && (
              <img
                src={process.env.REACT_APP_BASE_URL + props.imageUrl}
                alt='avatar'
              />
            )}
          </div>

          <h4 className=' text-error-red mt-6'>{errorMessage}</h4>
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

        {uploadedImage && !errorMessage ? (
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

export default ImageUploadModal;
