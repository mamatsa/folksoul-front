import React, { useState } from 'react';
import styles from 'pages/Landing/style';
import { SunNote } from 'components';

const Landing = () => {
  const [stopPlanets, setStopPlanets] = useState(false);
  const stopPlanetsHandler = () => {
    setStopPlanets((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className=' w-full h-screen flex items-center'>
      <div className={styles.orbitsContainer}>
        <div className={`${!stopPlanets && 'animate-pulse'}`}>
          <SunNote />
        </div>
        <div className={styles.staticOrbit}>
          <div
            className={`${styles.rotatingOrbit} ${stopPlanets && styles.stop}`}
          >
            <div
              className={`relative w-[80px] h-[80px] -ml-[40px] ${
                styles.planet
              } ${
                stopPlanets && `${styles.stop} w-[88px] h-[88px] -ml-[44px]`
              }`}
              onClick={stopPlanetsHandler}
            >
              <div className='w-full h-full overflow-hidden rounded-full'>
                <img src='' alt='' className='w-full h-auto scale-125' />
              </div>
              <div
                className={`absolute -bottom-[16px] right-0 left-0 pb-[3px] pt-[1px] bg-landing-yellow text-sm text-primary-dark-blue flex items-center justify-center rounded-full border-4 border-green-500 ${
                  stopPlanets && 'scale-110'
                }`}
              >
                name
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
