import React from 'react';
import { NavMain, NavMember, NavSocial, NavAbout, NavLogout } from 'assets';
import { NavItem } from 'components';

const DashboardWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='h-screen flex items-center'>
      <nav className='py-20 bg-nav-bg border-y border-r border-nav-border rounded-r-xl'>
        <ul className='flex flex-col gap-5 `'>
          <NavItem Icon={NavMain} text='მთავარი' destination='/dashboard' />
          <NavItem Icon={NavMember} text='ჯგუფის წევრები' destination='/' />
          <NavItem Icon={NavSocial} text='სოციალური ბმულები' destination='/' />
          <NavItem Icon={NavAbout} text='ბენდის შესახებ' destination='/' />
          <NavItem Icon={NavLogout} text='გადი გარეთ' destination='/' />
        </ul>
      </nav>
      <div className='w-full h-[90vh] flex justify-center items-center'>
        <div className='h-full w-9/12 flex flex-col justify-evenly items-center bg-dashboard-bg shadow-inside rounded-[20px]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
