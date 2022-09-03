import { Link } from 'react-router-dom';
import { NotFoundImg } from 'assets';

const NotFound = () => {
  return (
    <div className='bg-white h-screen w-screen'>
      <div className=' w-full h-5/6 flex justify-center items-center flex-col gap-10 px-2'>
        <img src={NotFoundImg} alt='404' />
        <div className='flex flex-col xs:flex-row items-center text-xl gap-2'>
          <h2>აქ არაფერია სანახავი</h2>
          <Link to='/' className=' underline font-semibold' id='goBack'>
            დაბრუნდი უკან
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
