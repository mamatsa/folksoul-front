import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AboutBand } from 'types';
import { getBandInformationRequest, putBandImageRequest } from 'services';
import {
  DashboardWrapper,
  DashboardPageTitle,
  EditPhotoButton,
  ImageUploadModal,
  EditTextButton,
} from 'components';

const About = () => {
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [bandInformation, setBandInformation] = useState<AboutBand>();
  const [socialLinkChanged, setSocialLinkChanged] = useState(0);

  useEffect(() => {
    const getBandInformation = async () => {
      try {
        const res = await getBandInformationRequest();
        setBandInformation(res.data.band);
      } catch (e) {
        //
      }
    };
    getBandInformation();
  }, [socialLinkChanged]);

  const closeModal = () => {
    setShowImageUploadModal(false);
  };

  const imageUploadHandler = async (image?: File) => {
    try {
      await putBandImageRequest(image);
    } catch (e) {
      //
    }
    closeModal();
    setSocialLinkChanged((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <DashboardWrapper>
      <div className='relative w-full h-full flex flex-col justify-evenly items-center'>
        <DashboardPageTitle title='ბენდის შესახებ' />
        <div className='w-[93%] h-full flex flex-col items-center gap-12  py-8 mb-20 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-track-scrollbar-blue scrollbar-thumb-primary-dark-blue scrollbar-thumb-rounded scrollbar-track-rounded'>
          <div className='relative w-52 h-52 min-h-52 mx-5 p-[7px] rounded-full bg-about-purple flex justify-center items-center drop-shadow-thin'>
            <div className='w-full h-full rounded-full flex items-center justify-center overflow-hidden'>
              {bandInformation?.imageUrl && (
                <img
                  src={
                    process.env.REACT_APP_BASE_URL! + bandInformation?.imageUrl
                  }
                  alt='ავატარი'
                  className='w-full h-auto'
                />
              )}
            </div>

            <Link
              to='#'
              className='absolute bottom-1 right-0 w-14 h-14'
              onClick={() => {
                setShowImageUploadModal(true);
              }}
              data-cy='update-band-image'
            >
              <EditPhotoButton />
            </Link>
          </div>
          {bandInformation?.about && (
            <div className='flex justify-center'>
              <p className='mx-24 text-justify whitespace-pre-line'>
                {bandInformation.about}
              </p>
            </div>
          )}
        </div>
        <div className='absolute h-2/3 bottom-0 left-10 flex items-center'>
          <Link to='/about-band/edit' data-cy='edit-band-info'>
            <EditTextButton />
          </Link>
        </div>
      </div>
      {showImageUploadModal && (
        <ImageUploadModal
          title='შეცვალე ბენდის პორტრეტი'
          closeModal={closeModal}
          imageUrl={bandInformation?.imageUrl}
          imageUploadHandler={imageUploadHandler}
          page='about'
        />
      )}
    </DashboardWrapper>
  );
};

export default About;
