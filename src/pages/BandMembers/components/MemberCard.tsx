import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ViewButton,
  ModifyButton,
  DeleteButton,
  EditPhotoButton,
} from 'components';
import { AvatarUploadModal } from 'pages/BandMembers/components';
import { BandMember } from 'types';

const MemberCard: React.FC<{
  bandMember: BandMember;
  memberChangeHandler: () => void;
}> = ({ bandMember, memberChangeHandler }) => {
  const [showAvatarEditModal, setShowAvatarEditModal] = useState(false);

  const closeModal = (avatarAdded?: boolean) => {
    // If avatar is changed, re-fetch band members from server in parent component
    if (avatarAdded) {
      memberChangeHandler();
    }
    setShowAvatarEditModal(false);
  };

  return (
    <div className='pt-4 flex flex-col justify-between items-center gap-3 bg-dashboard-dark border border-black rounded-[3px] shadow-card lg:gap-6 lg:pt-8'>
      <div className='relative w-28 h-28 mx-5 rounded-full bg-member-card-blue border border-white flex justify-center items-center lg:w-36 lg:h-36 lg:mx-9'>
        {bandMember.avatarUrl && (
          <div className='w-full h-full rounded-full flex items-center justify-center overflow-hidden'>
            <img
              src={process.env.REACT_APP_BASE_URL + bandMember.avatarUrl}
              alt='ავატარი'
              className='w-full h-auto'
            />
          </div>
        )}
        <Link
          to='#'
          className='absolute bottom-1 right-1'
          onClick={() => {
            setShowAvatarEditModal(true);
          }}
        >
          <EditPhotoButton />
        </Link>
      </div>
      <h3 className=' text-white text-lg tracking-widest'>{bandMember.name}</h3>
      <div className='w-full flex justify-between border border-black px-5 py-2'>
        <Link to='#'>
          <ViewButton />
        </Link>
        <Link to={'/band-members/update-member/' + bandMember._id}>
          <ModifyButton />
        </Link>
        <Link to='#'>
          <DeleteButton />
        </Link>
      </div>
      {showAvatarEditModal && (
        <AvatarUploadModal closeModal={closeModal} memberId={bandMember._id} />
      )}
    </div>
  );
};

export default MemberCard;
