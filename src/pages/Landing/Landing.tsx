import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BandMember, ResponseData, AboutBand } from 'types';
import { getBandMembersRequest, getBandInformationRequest } from 'services';
import { SunNote } from 'components';
import { Orbit, InformationPanel } from 'pages/Landing/components';
import { FolksoulLogo } from 'assets';

const Landing = () => {
  const [pausedPlanet, setPausedPlanet] = useState('');
  const [bandMembers, setBandMembers] = useState<BandMember[]>();
  const [bandInformation, setBandInformation] = useState<AboutBand>();

  useEffect(() => {
    const getBandMembers = async () => {
      try {
        const res: ResponseData = await getBandMembersRequest();
        setBandMembers(res.data.bandMembers);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getBandInformation = async () => {
      try {
        const res: ResponseData = await getBandInformationRequest();
        setBandInformation(res.data.band);
      } catch (error) {
        console.log(error);
      }
    };
    getBandInformation();
    getBandMembers();
  }, []);

  const stopPlanetsHandler = (memberId: string) => {
    setPausedPlanet(memberId);
  };

  const startPlanetsHandler = () => {
    setPausedPlanet('');
  };

  return (
    <div className='relative w-full h-screen overflow-hidden flex items-center justify-end'>
      <div className='absolute top-0 left-0 right-0 pl-14 pr-16 pt-6 flex items-center justify-between'>
        <img src={FolksoulLogo} alt='Folksoul' />
        <Link to='/login'>
          <h3 className='text-white text-lg'>შესვლა</h3>
        </Link>
      </div>
      <div className='absolute bottom-0 left-0 h-[900px] w-[900px] flex justify-center items-center overflow-hidden'>
        <div
          className={`z-10 ${!pausedPlanet && 'animate-pulse'} ${
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
      <div className='h-screen w-1/2 flex items-end mb-[200px] justify-center'>
        <InformationPanel
          text={bandInformation?.about}
          imageUrl={bandInformation?.imageUrl}
        />
      </div>
    </div>
  );
};

export default Landing;
