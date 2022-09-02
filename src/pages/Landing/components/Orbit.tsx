import React from 'react';
import styles from 'pages/Landing/style';
import { BandMember } from 'types';

const SunNoteWidth = 200;

const Orbit: React.FC<{
  pausedPlanet: string;
  stopPlanetsHandler: (memberId: string) => void;
  bandMember: BandMember;
}> = (props) => {
  const orbitSize = 2 * props.bandMember.orbitWidth + SunNoteWidth;
  const position = (900 - orbitSize) / 2;
  const speed = Math.floor(orbitSize / 40) + 4;

  return (
    <>
      <div
        className={`${styles.staticOrbit}`}
        style={{
          width: orbitSize,
          height: orbitSize,
          top: position,
          left: position,
          zIndex: -1,
        }}
      ></div>
      <div
        className={`${styles.rotatingOrbit} ${
          props.pausedPlanet && styles.stop
        }`}
        style={{
          width: orbitSize,
          height: orbitSize,
          top: position,
          left: position,
          animation: styles.spinRight + ' linear infinite ' + speed + 's',
          animationPlayState: props.pausedPlanet ? 'paused' : 'running',
          pointerEvents: 'none',
          zIndex: props.pausedPlanet === props.bandMember._id ? 20 : 10,
        }}
      >
        <div
          className={`relative w-[80px] h-[80px] -ml-[40px] ${styles.planet} ${
            props.pausedPlanet === props.bandMember._id &&
            ' w-[100px] h-[100px] -ml-[50px]'
          }`}
          onClick={() => {
            props.stopPlanetsHandler(props.bandMember._id);
          }}
          style={{
            animation: styles.spinLeft + ' linear infinite ' + speed + 's',
            animationPlayState: props.pausedPlanet ? 'paused' : 'running',
            pointerEvents: 'all',
            backgroundColor: props.bandMember.color,
          }}
        >
          <div className='w-full h-full overflow-hidden rounded-full cursor-pointer'>
            <img
              src={
                props.bandMember.avatarUrl &&
                process.env.REACT_APP_BASE_URL + props.bandMember.avatarUrl
              }
              alt=''
              className='w-full h-auto scale-125'
            />
          </div>
          <div
            className={`absolute -bottom-[16px] right-0 left-0 pb-[3px] pt-[1px] bg-landing-yellow text-sm text-primary-dark-blue flex items-center justify-center rounded-full border-4 cursor-pointer ${
              props.pausedPlanet === props.bandMember._id && 'scale-125'
            } border-[${props.bandMember.color}]`}
          >
            {props.bandMember.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orbit;
