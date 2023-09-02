import useUserStore from '@/store/user-store';

const AdminDashboard = () => {
  const { name } = useUserStore((state) => state.loginDetail);
  return (
    <div className="py-8">
      <h2 className="font-bold text-2xl text-center">Namaste, {name} Ji.</h2>

      <div>
        <a>Add Candidate</a>
      </div>
    </div>
  );
};

export default AdminDashboard;
