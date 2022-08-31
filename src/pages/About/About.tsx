import { useState } from 'react';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { Link } from 'react-router-dom';
import { EditPhotoButton, ImageUploadModal } from 'components';

const About = () => {
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);

  const closeModalHandler = () => {
    setShowImageUploadModal(false);
  };

  const imageUploadHandler = (image?: File) => {
    console.log(image);
    setShowImageUploadModal(false);
  };

  return (
    <DashboardWrapper>
      <DashboardPageTitle title='ბენდის შესახებ' />
      <div className=' w-full h-full flex flex-col items-center py-8 drop-shadow-thin'>
        <div className='relative w-52 h-52 mx-5 p-[7px] rounded-full bg-about-purple flex justify-center items-center'>
          <div className='w-full h-full rounded-full flex items-center justify-center overflow-hidden'>
            <img src='' alt='ავატარი' className='w-full h-auto' />
          </div>

          <Link
            to='#'
            className='absolute bottom-1 right-0 w-14 h-14'
            onClick={() => {
              setShowImageUploadModal(true);
            }}
          >
            <EditPhotoButton />
          </Link>
        </div>
      </div>
      {showImageUploadModal && (
        <ImageUploadModal
          title='შეცვალე ბენდის პორტრეტი'
          closeModal={closeModalHandler}
          imageUrl=''
          imageUploadHandler={imageUploadHandler}
          page='about'
        />
      )}
    </DashboardWrapper>
  );
};

export default About;
