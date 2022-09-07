import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem: React.FC<{
  Icon: () => JSX.Element;
  text: string;
  destination: string;
  logoutHandler?: () => void;
  testId?: string;
}> = (props) => {
  return (
    <NavLink
      to={props.destination}
      className={({ isActive }) =>
        isActive
          ? 'w-full pl-2 pr-2 bg-white text-black md:pl-4 md:pr-8'
          : 'w-full pl-2 pr-2 text-white md:pl-4 md:pr-8'
      }
      onClick={props.logoutHandler}
      data-cy={props.testId}
    >
      <li className='flex py-2 items-center text-sm whitespace-nowrap md:text-lg'>
        <div className='w-9 flex justify-start'>
          <props.Icon />
        </div>
        <span className='mt-[5px]'>{props.text}</span>
      </li>
    </NavLink>
  );
};

export default NavItem;
