import { DashboardTV } from 'assets';
import { DashboardWrapper } from 'components';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <h1 className='tracking-wider text-3xl lg:text-5xl'>დილამშვიდობისა!</h1>
      <img src={DashboardTV} alt='TV' className=' w-full lg:w-auto' />
    </DashboardWrapper>
  );
};

export default Dashboard;
