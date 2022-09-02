import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BandMember, ResponseData, AboutBand, SocialLink } from 'types';
import {
  getBandMembersRequest,
  getBandInformationRequest,
  getSocialLinksRequest,
} from 'services';
import { SunNote } from 'components';
import { Orbit, InformationPanel } from 'pages/Landing/components';
import { FolksoulLogo } from 'assets';

const Landing = () => {
  const [bandMembers, setBandMembers] = useState<BandMember[]>();
  const [bandInformation, setBandInformation] = useState<AboutBand>();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>();
  const [pausedPlanet, setPausedPlanet] = useState('');

  let panelImage;
  let panelInfo;
  if (pausedPlanet && bandMembers) {
    const bandMember = bandMembers.find((member) => {
      return member._id === pausedPlanet;
    });
    panelImage = bandMember?.avatarUrl;
    panelInfo = bandMember?.bio;
  } else if (bandInformation) {
    panelImage = bandInformation.imageUrl;
    panelInfo = bandInformation.about;
  }

  useEffect(() => {
    const getBandMembers = async () => {
      try {
        const res: ResponseData = await getBandMembersRequest();
        setBandMembers(res.data.bandMembers);
      } catch (error) {
        //
      }
    };
    const getBandInformation = async () => {
      try {
        const res: ResponseData = await getBandInformationRequest();
        setBandInformation(res.data.band);
      } catch (error) {
        //
      }
    };
    const getSocialLinks = async () => {
      try {
        const res: ResponseData = await getSocialLinksRequest();
        setSocialLinks(res.data.socialLinks);
      } catch (error) {
        //
      }
    };
    getBandInformation();
    getBandMembers();
    getSocialLinks();
  }, []);

  console.log(1212);

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
      <div className='h-screen w-1/2 flex flex-col items-center justify-end'>
        <InformationPanel text={panelInfo} imageUrl={panelImage} />
        <div className='flex mt-6 mb-10 gap-7'>
          {socialLinks &&
            socialLinks.map((socialLink, i) => {
              return (
                <a
                  href={socialLink.link}
                  key={i}
                  target='_blank'
                  rel='noreferrer'
                >
                  <img
                    src={process.env.REACT_APP_BASE_URL + socialLink.iconUrl!}
                    alt={socialLink.name}
                    className='w-10 h-auto'
                  />
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Landing;
