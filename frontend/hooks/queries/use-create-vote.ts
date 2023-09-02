import { useMutation } from 'react-query';
import { ApiError } from './use-create-voter';

type CreateVoteResponse = { msg: string };

type VoteData = { token: string; candidateId: string };

const createVote = async (voteData: VoteData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/votes`, {
    method: 'POST',
    body: JSON.stringify({ candidateId: voteData.candidateId }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${voteData.token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to create vote - ${(await res.json()).message}`);
  }

  return res.json();
};

export const useCreateVote = () => {
  return useMutation<CreateVoteResponse, ApiError, VoteData>(createVote);
};
