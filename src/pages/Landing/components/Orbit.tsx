import React from 'react';
import { BandMember } from 'types';

const SunNoteWidth = 200;

const Orbit: React.FC<{
  pausedPlanet: string;
  stopPlanetsHandler: (memberId: string) => void;
  bandMember: BandMember;
  numeration: number;
}> = (props) => {
  const orbitSize = 2 * props.bandMember.orbitWidth + SunNoteWidth;
  const position = (900 - orbitSize) / 2;
  const speed = props.numeration * 5 + 12;

  return (
    <>
      {/* Displayed orbit */}
      <div
        className={`absolute border-2 border-dashed border-landing-yellow rounded-full -z-10`}
        style={{
          width: orbitSize,
          height: orbitSize,
          top: position,
          left: position,
        }}
      ></div>
      {/* Rotating invisible orbit */}
      <div
        className='absolute flex items-center pointer-events-none'
        style={{
          width: orbitSize,
          height: orbitSize,
          top: position,
          left: position,
          animation: 'rotate linear infinite ' + speed + 's',
          animationPlayState: props.pausedPlanet ? 'paused' : 'running',
          zIndex: props.pausedPlanet === props.bandMember._id ? 20 : 10,
        }}
      >
        {/* Planet */}
        <div
          className={`relative w-[80px] h-[80px] -ml-[40px] rounded-full border-[3px] border-landing-yellow pointer-events-auto ${
            props.pausedPlanet === props.bandMember._id &&
            ' w-[100px] h-[100px] -ml-[50px]'
          }`}
          onClick={() => {
            props.stopPlanetsHandler(props.bandMember._id);
          }}
          style={{
            animation: 'rotate reverse linear infinite ' + speed + 's',
            animationPlayState: props.pausedPlanet ? 'paused' : 'running',
            backgroundColor: props.bandMember.color,
          }}
          data-cy={'planet-' + props.numeration}
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
            }`}
            style={{ borderColor: props.bandMember.color }}
          >
            {props.bandMember.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orbit;
