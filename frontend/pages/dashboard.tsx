import CandidatesList from '@/components/CandidatesList';
import { useGetCandidates } from '@/hooks/queries/use-get-candidates';
import useUserStore from '@/store/user-store';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { name } = useUserStore((state) => state.loginDetail);

  const { data: candidates } = useGetCandidates();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <div className="max-w-[600px] mx-auto py-8">
        <h2 className="font-bold text-2xl">Namaste, {name} Ji.</h2>
        <p className="text-gray-500">
          Here are the candidates for the election:
        </p>
        <CandidatesList candidates={candidates} />
      </div>
    )
  );
};

export default Dashboard;
