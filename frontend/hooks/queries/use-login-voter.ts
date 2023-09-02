import { Voter } from '@/pages/register';
import { useMutation, useQueryClient } from 'react-query';
import { ApiError } from './use-create-voter';
import { VoterLoginData } from '@/pages/login';

type ImageUploadResponse = { msg: string };

const loginVoter = async (loginData: VoterLoginData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/voters/login`,
    {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to login voter - ${(await res.json()).message}`);
  }

  return res.json();
};

export const useLoginVoter = () => {
  return useMutation<ImageUploadResponse, ApiError, VoterLoginData>(loginVoter);
};
