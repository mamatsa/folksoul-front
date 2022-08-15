import { DashboardTV } from 'assets';
import { DashboardWrapper } from 'components';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <h1 className=' text-5xl tracking-wider'>დილამშვიდობისა!</h1>
      <img src={DashboardTV} alt='TV' />
    </DashboardWrapper>
  );
};

export default Dashboard;
