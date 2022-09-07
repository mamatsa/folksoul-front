import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ViewButton,
  ModifyButton,
  DeleteButton,
  EditPhotoButton,
  ImageUploadModal,
} from 'components';
import { DetailedInfoModal } from 'pages/BandMembers/components';
import { BandMember, ResponseData } from 'types';
import { deleteBandMemberRequest, putMemberAvatarRequest } from 'services';

const MemberCard: React.FC<{
  bandMember: BandMember;
  memberChangeHandler: () => void;
}> = (props) => {
  const [showAvatarEditModal, setShowAvatarEditModal] = useState(false);
  const [showDetailedInfoModal, setShowDetailedInfoModal] = useState(false);

  const closeModal = () => {
    setShowAvatarEditModal(false);
    setShowDetailedInfoModal(false);
  };

  const imageUploadHandler = async (image?: File) => {
    try {
      await putMemberAvatarRequest(props.bandMember._id, image);
    } catch (e) {
      //
    }
    closeModal();
    props.memberChangeHandler();
  };

  const memberDeleteHandler = async () => {
    try {
      const res: ResponseData = await deleteBandMemberRequest(
        props.bandMember._id
      );
      if (res.status === 'success') {
        props.memberChangeHandler();
      }
    } catch (error) {
      // error
    }
  };

  return (
    <div className='pt-4 flex flex-col justify-between items-center gap-3 bg-dashboard-dark border border-black rounded-[3px] shadow-card lg:gap-6 lg:pt-8'>
      <div className='relative w-28 h-28 mx-5 rounded-full bg-member-card-blue border border-white flex justify-center items-center lg:w-36 lg:h-36 lg:mx-9'>
        {props.bandMember.avatarUrl && (
          <div className='w-full h-full rounded-full flex items-center justify-center overflow-hidden'>
            <img
              src={process.env.REACT_APP_BASE_URL + props.bandMember.avatarUrl}
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
          data-cy={`avatar-${props.bandMember._id}-update-button`}
        >
          <EditPhotoButton />
        </Link>
      </div>
      <h3 className=' text-white text-lg tracking-widest'>
        {props.bandMember.name}
      </h3>
      <div className='w-full flex justify-between border border-black px-5 py-2'>
        <Link
          to='#'
          onClick={() => {
            setShowDetailedInfoModal(true);
          }}
          data-cy={`member-${props.bandMember._id}-view-button`}
        >
          <ViewButton />
        </Link>
        <Link
          to={'/band-members/update-member/' + props.bandMember._id}
          data-cy={`member-${props.bandMember._id}-edit-button`}
        >
          <ModifyButton />
        </Link>
        <Link
          to='#'
          onClick={memberDeleteHandler}
          data-cy={`member-${props.bandMember._id}-delete-button`}
        >
          <DeleteButton />
        </Link>
      </div>
      {showAvatarEditModal && (
        <ImageUploadModal
          title='შეცვალე ჯგუფის წევრის ავატარი'
          closeModal={closeModal}
          imageUploadHandler={imageUploadHandler}
          imageUrl={props.bandMember.avatarUrl}
          page='members'
        />
      )}
      {showDetailedInfoModal && (
        <DetailedInfoModal
          closeModal={closeModal}
          bandMember={props.bandMember}
        />
      )}
    </div>
  );
};

export default MemberCard;
