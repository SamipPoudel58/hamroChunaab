import { Candidate } from '@/pages/admin-dashboard';
import { useMutation, useQueryClient } from 'react-query';
import { ApiError } from './use-create-voter';

type AddCandidateResponse = { msg: string };

const addCandidate = async (candidateData: Candidate) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/candidates`,
    {
      method: 'POST',
      body: JSON.stringify(candidateData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to create candidate - ${(await res.json()).message}`
    );
  }

  return res.json();
};

export const useAddCandidate = () => {
  return useMutation<AddCandidateResponse, ApiError, Candidate>(addCandidate);
};
