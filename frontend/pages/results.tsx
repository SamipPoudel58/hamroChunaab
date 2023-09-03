import { useGetResults } from '@/hooks/queries/use-get-results';
import { useEffect, useState } from 'react';

const Results = () => {
  const { data } = useGetResults();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <div className="max-w-[600px] mx-auto py-8">
        <h2 className="font-bold text-2xl">Election Results</h2>
        <p className="text-gray-500 mb-4">
          Here are the results for the election:
        </p>
        {data &&
          data.map((item, idx) => (
            <div
              className="flex justify-between items-center bg-slate-50 py-2 px-4 rounded"
              key={idx}
            >
              <div className="flex gap-x-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-16 h-16"
                  src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
                  alt="profile"
                />
                <div>
                  <h3 className="font-bold text-lg">{item.candidate.name}</h3>
                  <p className="text-slate-500">{item.candidate.party}</p>
                </div>
              </div>

              <div className="text-sky-500 flex flex-col items-center">
                <h4 className="text-2xl font-bold">{item.totalVotes}</h4>
                <p className="text-sm">Vote</p>
              </div>
            </div>
          ))}
      </div>
    )
  );
};

export default Results;
