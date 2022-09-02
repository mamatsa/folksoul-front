import React, { useState, useEffect } from 'react';
import { BandMember, ResponseData } from 'types';
import { getBandMembersRequest } from 'services';
// import styles from 'pages/Landing/style';
import { SunNote } from 'components';
import { Orbit } from 'pages/Landing/components';

const Landing = () => {
  const [pausedPlanet, setPausedPlanet] = useState('');
  const [bandMembers, setBandMembers] = useState<BandMember[]>();

  useEffect(() => {
    const getBandMembers = async () => {
      try {
        const res: ResponseData = await getBandMembersRequest();
        setBandMembers(res.data.bandMembers);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBandMembers();
  }, []);

  const stopPlanetsHandler = (memberId: string) => {
    setPausedPlanet(memberId);
  };

  const startPlanetsHandler = () => {
    setPausedPlanet('');
  };

  return (
    <div className=' w-full h-screen flex items-center overflow-hidden'>
      <div className='absolute bottom-0 left-0 h-[900px] w-[900px] flex justify-center items-center overflow-hidden'>
        <div
          className={`z-[100] ${!pausedPlanet && 'animate-pulse'} ${
            pausedPlanet && 'cursor-pointer'
          }`}
          onClick={startPlanetsHandler}
        >
          <SunNote />
        </div>
        {bandMembers &&
          bandMembers.map((bandMember, i) => {
            return (
              <Orbit
                pausedPlanet={pausedPlanet}
                stopPlanetsHandler={stopPlanetsHandler}
                bandMember={bandMember}
                key={i}
                numeration={i}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Landing;
