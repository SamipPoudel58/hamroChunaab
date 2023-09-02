import { useQueryClient } from 'react-query';

const Dashboard = () => {
  const queryClient = useQueryClient();

  // Access the mutation response from the cache using the query key
  const mutationResponse = queryClient.getQueryData('login');
  console.log('Dashboard', mutationResponse);
  return <div></div>;
};

export default Dashboard;
