import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ViewButton,
  ModifyButton,
  DeleteButton,
  EditPhotoButton,
} from 'components';
import {
  AvatarUploadModal,
  DetailedInfoModal,
} from 'pages/BandMembers/components';
import { BandMember, ResponseData } from 'types';
import { deleteBandMemberRequest } from 'services/backendRequests';

const MemberCard: React.FC<{
  bandMember: BandMember;
  memberChangeHandler: () => void;
}> = ({ bandMember, memberChangeHandler }) => {
  const [showAvatarEditModal, setShowAvatarEditModal] = useState(false);
  const [showDetailedInfoModal, setShowDetailedInfoModal] = useState(false);

  const closeModal = (avatarAdded?: boolean) => {
    // If avatar is changed, re-fetch band members from server in parent component
    if (avatarAdded) {
      memberChangeHandler();
    }
    setShowAvatarEditModal(false);
    setShowDetailedInfoModal(false);
  };

  const memberDeleteHandler = async () => {
    try {
      const res: ResponseData = await deleteBandMemberRequest(bandMember._id);
      if (res.status === 'success') {
        memberChangeHandler();
      }
    } catch (error) {
      // error
    }
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
        <Link
          to='#'
          onClick={() => {
            setShowDetailedInfoModal(true);
          }}
        >
          <ViewButton />
        </Link>
        <Link to={'/band-members/update-member/' + bandMember._id}>
          <ModifyButton />
        </Link>
        <Link to='#' onClick={memberDeleteHandler}>
          <DeleteButton />
        </Link>
      </div>
      {showAvatarEditModal && (
        <AvatarUploadModal closeModal={closeModal} memberId={bandMember._id} />
      )}
      {showDetailedInfoModal && (
        <DetailedInfoModal closeModal={closeModal} bandMember={bandMember} />
      )}
    </div>
  );
};

export default MemberCard;
