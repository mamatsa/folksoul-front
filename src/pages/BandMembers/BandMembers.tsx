import { DashboardWrapper } from 'components';
import { Link } from 'react-router-dom';

const BandMembers = () => {
  return (
    <DashboardWrapper>
      <div className=' w-full h-full flex flex-col items-center justify-evenly'>
        <div className='w-full flex flex-col items-center gap-6'>
          <h2 className='text-xl'>ჯგუფის წევრები</h2>
          <div className='h-[1px] w-4/5 bg-black'></div>
        </div>
        ბენდის წევრი
        <Link to='#' className='text-link-blue underline text-lg font-bold'>
          ახალი წევრი გვყავს?
        </Link>
      </div>
    </DashboardWrapper>
  );
};

export default BandMembers;
