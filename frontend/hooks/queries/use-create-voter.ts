import { Voter } from '@/pages/register';
import { useMutation, useQueryClient } from 'react-query';

export type ApiError = { msg: string; error: Error; stack?: string };

type CreateVoterResponse = { msg: string };

const createVoter = async (voterData: Voter) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/voters`,
    {
      method: 'POST',
      body: JSON.stringify(voterData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to create voter - ${(await res.json()).message}`);
  }

  return res.json();
};

export const useCreateVoter = () => {
  return useMutation<CreateVoterResponse, ApiError, Voter>(createVoter);
};
