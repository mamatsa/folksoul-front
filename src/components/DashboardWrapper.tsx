import React from 'react';
import { NavMain, NavMember, NavSocial, NavAbout, NavLogout } from 'components';
import { NavItem } from 'components';

const DashboardWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem('token');
  };
  return (
    <div className='h-screen flex items-center'>
      <nav className='py-20 bg-dashboard-dark border-y border-r border-nav-border rounded-r-xl'>
        <ul className='flex flex-col gap-5 `'>
          <NavItem
            Icon={NavMain}
            text='მთავარი'
            destination='/dashboard'
            testId='nav-dashboard'
          />
          <NavItem
            Icon={NavMember}
            text='ჯგუფის წევრები'
            destination='/band-members'
            testId='nav-members'
          />
          <NavItem
            Icon={NavSocial}
            text='სოციალური ბმულები'
            destination='/social-links'
            testId='nav-social'
          />
          <NavItem
            Icon={NavAbout}
            text='ბენდის შესახებ'
            destination='/about-band'
            testId='nav-about'
          />
          <NavItem
            Icon={NavLogout}
            text='გადი გარეთ'
            destination='/'
            logoutHandler={logoutHandler}
            testId={'nav-logout'}
          />
        </ul>
      </nav>
      <div className='w-full h-[90vh] flex justify-center items-center'>
        <div className='h-full w-11/12 flex flex-col justify-evenly items-center bg-dashboard-bg shadow-inside rounded-[20px] md:w-4/5'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
