import { useState, useEffect } from 'react';
import { DashboardWrapper, DashboardPageTitle } from 'components';
import { Link } from 'react-router-dom';
import { EditPhotoButton, ImageUploadModal } from 'components';
import { getBandInformationRequest, putBandImageRequest } from 'services';
import { AboutBand } from 'types';

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
      <DashboardPageTitle title='ბენდის შესახებ' />
      <div className=' w-full h-full flex flex-col items-center py-8 drop-shadow-thin'>
        <div className='relative w-52 h-52 mx-5 p-[7px] rounded-full bg-about-purple flex justify-center items-center'>
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
          >
            <EditPhotoButton />
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
