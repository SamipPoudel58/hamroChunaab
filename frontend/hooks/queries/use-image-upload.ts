import { useMutation, useQueryClient } from 'react-query';
import { ApiError } from './use-create-voter';

type ImageUploadResponse = [{ secure_url: string; public_id: string }];
type MutationVariable = string[];

const imageUpload = async (images: MutationVariable) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/upload`,
    {
      method: 'POST',
      body: JSON.stringify({ data: images }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Upload Error 😞 - ${(await res.json()).message}`);
  }

  return res.json();
};

export const useImageUpload = () => {
  return useMutation<ImageUploadResponse, ApiError, MutationVariable>(
    imageUpload
  );
};
