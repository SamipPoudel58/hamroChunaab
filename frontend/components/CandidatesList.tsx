import { useCreateVote } from '@/hooks/queries/use-create-vote';
import { Candidate } from '@/pages/admin-dashboard';
import useUserStore from '@/store/user-store';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CandidatesList = ({
  candidates,
}: {
  candidates: Candidate[] | undefined;
}) => {
  const { token, admin } = useUserStore((state) => state.loginDetail);
  const setHasVoted = useUserStore((state) => state.setHasVoted);

  const router = useRouter();

  const { mutate: createVote, isLoading } = useCreateVote();

  const [potentialVote, setPotentialVote] = useState<Candidate | null>(null);

  const handleConfirmVote = () => {
    if (potentialVote) {
      createVote(
        { token, candidateId: potentialVote._id },
        {
          onSuccess: () => {
            setHasVoted(true);
          },
        }
      );
    }
  };

  return (
    <div className="space-y-2 mt-4">
      {candidates &&
        candidates.map((candidate, idx) => (
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
                <h3 className="font-bold text-lg">{candidate.name}</h3>
                <p className="text-slate-500">{candidate.party}</p>
              </div>
            </div>
            {!admin && (
              <button
                onClick={() => setPotentialVote(candidate)}
                className="border-2 border-sky-500 text-sky-500 py-2 px-6"
              >
                Vote
              </button>
            )}
            {potentialVote && (
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-[500px] bg-white shadow-md p-8 rounded-md">
                <p className="text-lg">
                  Confirm your vote for{' '}
                  <span className="text-sky-500 font-bold">
                    {potentialVote?.name}
                  </span>
                  ?
                </p>
                <div className="flex items-center gap-x-2 mt-4">
                  <button
                    onClick={handleConfirmVote}
                    className="border-2 border-sky-500 py-2 px-4 text-white bg-sky-500 font-medium"
                  >
                    {isLoading ? 'Voting...' : 'Confirm'}
                  </button>
                  <button
                    onClick={() => setPotentialVote(null)}
                    className="font-medium text-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CandidatesList;
