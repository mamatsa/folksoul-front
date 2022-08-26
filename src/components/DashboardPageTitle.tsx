import React from 'react';

const DashboardPageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className=' w-full mt-20 flex flex-col items-center gap-6'>
      <h2 className='text-xl'>{title}</h2>
      <div className='h-[1px] w-4/5 bg-black'></div>
    </div>
  );
};

export default DashboardPageTitle;
