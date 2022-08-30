import React, { useState } from 'react';
import { SocialLink, ResponseData } from 'types';
import { Link } from 'react-router-dom';
import { ModifyButton, DeleteButton, EditPhotoButton } from 'components';
import { ImageUploadModal } from 'components';
import { putSocialLinkIconRequest, deleteSocialLinkRequest } from 'services';

const SocialLinkCard: React.FC<{
  socialLink: SocialLink;
  socialLinkChangeHandler: () => void;
}> = (props) => {
  const [showAvatarEditModal, setShowAvatarEditModal] = useState(false);

  const closeModal = () => {
    setShowAvatarEditModal(false);
  };

  const imageUploadHandler = async (image?: File) => {
    try {
      await putSocialLinkIconRequest(props.socialLink._id, image);
    } catch (e) {
      //
    }
    closeModal();
    props.socialLinkChangeHandler();
  };

  const socialLinkDeleteHandler = async () => {
    try {
      const res: ResponseData = await deleteSocialLinkRequest(
        props.socialLink._id
      );
      if (res.status === 'success') {
        props.socialLinkChangeHandler();
      }
    } catch (error) {
      // error
    }
  };

  return (
    <div className='w-3/4 bg-dashboard-dark flex justify-between items-center px-7 py-4 rounded-[5px] shadow-small'>
      <div className='relative h-9 w-14 flex items-center justify-center overflow-hidden'>
        {props.socialLink.iconUrl && (
          <img
            src={process.env.REACT_APP_BASE_URL + props.socialLink.iconUrl}
            alt='icon'
            className='h-full w-auto'
          />
        )}
        <Link
          to='#'
          className='absolute bottom-0 right-0 h-5 w-5'
          onClick={() => {
            setShowAvatarEditModal(true);
          }}
        >
          <EditPhotoButton />
        </Link>
      </div>
      <h3 className='text-lg text-white'>{props.socialLink.name}</h3>
      <a
        href={props.socialLink.link}
        className='text-social-link-blue underline'
        target='_blank'
        rel='noreferrer'
      >
        {props.socialLink.link}
      </a>
      <div className='flex gap-4 xl:gap-16'>
        <Link to={'/social-links/update-social-link/' + props.socialLink._id}>
          <ModifyButton />
        </Link>
        <Link to='#' onClick={socialLinkDeleteHandler}>
          <DeleteButton />
        </Link>
      </div>
      {showAvatarEditModal && (
        <ImageUploadModal
          title='შეცვალე სოციალური ბმულის ხატულა'
          closeModal={closeModal}
          imageUploadHandler={imageUploadHandler}
          imageUrl={props.socialLink.iconUrl}
        />
      )}
    </div>
  );
};

export default SocialLinkCard;