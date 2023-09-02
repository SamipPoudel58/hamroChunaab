import useUserStore from '@/store/user-store';

const Dashboard = () => {
  const { name } = useUserStore((state) => state.loginDetail);
  return (
    <div className="py-8">
      <h2 className="font-bold text-2xl text-center">Namaste, {name} Ji.</h2>
    </div>
  );
};

export default Dashboard;
