import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{ Icon: any; text: string; destination: string }> = ({
  Icon,
  text,
  destination,
}) => {
  return (
    <NavLink
      to={destination}
      className={({ isActive }) =>
        isActive
          ? 'w-full pl-4 pr-8 bg-white text-black'
          : 'w-full pl-4 pr-8 text-white'
      }
    >
      <li className='flex py-2 items-center text-lg whitespace-nowrap'>
        <div className='w-9 flex justify-start'>
          <Icon />
        </div>
        <span className='mt-[5px]'>{text}</span>
      </li>
    </NavLink>
  );
};

export default NavItem;
