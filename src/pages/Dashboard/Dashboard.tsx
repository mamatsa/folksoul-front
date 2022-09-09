import { useEffect, useState } from 'react';
import { getBandInformationRequest } from 'services';
import { DashboardWrapper, TVSatellite, TVFeet } from 'components';

const Dashboard = () => {
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    const getBandInformation = async () => {
      try {
        const res = await getBandInformationRequest();
        setImageUrl(res.data.band.imageUrl);
      } catch (e) {
        //
      }
    };
    getBandInformation();
  }, []);

  return (
    <DashboardWrapper>
      <h1 className='tracking-wider text-3xl lg:text-5xl'>დილამშვიდობისა!</h1>
      <div className='w-full flex flex-col justify-center items-center'>
        <TVSatellite />
        <div className='w-[516px] h-[344px] border-[20px] border-black flex justify-center items-center overflow-hidden'>
          {imageUrl && (
            <img
              src={process.env.REACT_APP_BASE_URL + imageUrl}
              alt='TV'
              className='h-full w-full object-cover'
            />
          )}
        </div>
        <TVFeet />
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
