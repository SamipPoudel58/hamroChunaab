import CandidatesList from '@/components/CandidatesList';
import { useGetCandidates } from '@/hooks/queries/use-get-candidates';
import useUserStore from '@/store/user-store';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { name } = useUserStore((state) => state.loginDetail);
  const hasVoted = useUserStore((state) => state.hasVoted);

  const { data: candidates } = useGetCandidates();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <div className="max-w-[600px] mx-auto py-8">
        {hasVoted ? (
          <div className="flex items-center gap-x-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-32 h-32 stroke-sky-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Vote Casted Successfully
              </h2>
              <p className="text-gray-600">
                You can see the election results once its published in the
                results page.
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-2xl">Namaste, {name} Ji.</h2>
            <p className="text-gray-500">
              Here are the candidates for the election:
            </p>
            <CandidatesList candidates={candidates} />
          </>
        )}
      </div>
    )
  );
};

export default Dashboard;
