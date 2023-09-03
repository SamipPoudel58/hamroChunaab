import { useQuery } from 'react-query';
import { ApiError } from './use-create-voter';
import { Candidate } from '@/pages/admin-dashboard';

type GetResultsResponse = {
  candidate: { name: string; party: string };
  totalVotes: number;
}[];

const getResults = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/votes/results`,
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

export const useGetResults = () => {
  return useQuery<GetResultsResponse, ApiError>(['results'], getResults);
};
