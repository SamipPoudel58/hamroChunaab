import { useQuery } from 'react-query';
import { ApiError } from './use-create-voter';
import { Candidate } from '@/pages/admin-dashboard';

type GetCandidatesResponse = { msg: string };

const getCandidates = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/candidates`,
    {
      method: 'GET',
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

export const useGetCandidates = () => {
  return useQuery<GetCandidatesResponse, ApiError, Candidate[]>(
    ['candidates'],
    getCandidates
  );
};
