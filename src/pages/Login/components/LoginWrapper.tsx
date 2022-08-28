import React from 'react';

const LoginWrapper: React.FC<{ children: JSX.Element }> = (props) => (
  <div className='flex items-center justify-center h-screen'>
    <div className='w-full flex flex-col justify-between gap-12 border-y border-white px-2 py-16  bg-login-gradient xs:w-auto xs:px-12 xs:border xs:rounded-sm'>
      <div className=' w-min mx-auto text-white bg-red-bg pt-6 pb-4 px-10 shadow-xl -skew-x-[24deg]'>
        <h1 className='skew-x-[24deg] text-login-black text-xl font-bold tracking-wider'>
          კარიბჭე
        </h1>
      </div>
      {props.children}
    </div>
  </div>
);

export default LoginWrapper;
