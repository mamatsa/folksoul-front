import { MemberIcon } from 'components';
import {
  ViewButton,
  ModifyButton,
  DeleteButton,
  EditPhotoButton,
} from 'components';
import { Link } from 'react-router-dom';

const MemberCard = () => {
  return (
    <div className='pt-4 flex flex-col justify-between items-center gap-3 bg-dashboard-dark border border-black rounded-[3px] shadow-card lg:gap-6 lg:pt-8'>
      <div className='relative w-28 h-28 mx-5 rounded-full bg-member-card-blue border border-white flex justify-center items-center lg:w-36 lg:h-36 lg:mx-9'>
        <MemberIcon />
        <Link to='#' className='absolute bottom-1 right-1'>
          <EditPhotoButton />
        </Link>
      </div>
      <h3 className=' text-white text-lg tracking-widest'>საბა</h3>
      <div className='w-full flex justify-between border border-black px-5 py-2'>
        <Link to='#'>
          <ViewButton />
        </Link>
        <Link to='#'>
          <ModifyButton />
        </Link>
        <Link to='#'>
          <DeleteButton />
        </Link>
      </div>
    </div>
  );
};

export default MemberCard;
