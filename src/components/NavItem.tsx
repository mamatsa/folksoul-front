import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{
  Icon: any;
  text: string;
  destination: string;
  logoutHandler?: () => void;
}> = ({ Icon, text, destination, logoutHandler }) => {
  return (
    <NavLink
      to={destination}
      className={({ isActive }) =>
        isActive
          ? 'w-full pl-2 pr-2 bg-white text-black md:pl-4 md:pr-8'
          : 'w-full pl-2 pr-2 text-white md:pl-4 md:pr-8'
      }
      onClick={logoutHandler}
    >
      <li className='flex py-2 items-center text-sm whitespace-nowrap md:text-lg'>
        <div className='w-9 flex justify-start'>
          <Icon />
        </div>
        <span className='mt-[5px]'>{text}</span>
      </li>
    </NavLink>
  );
};

export default NavItem;
