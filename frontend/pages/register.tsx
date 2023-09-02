import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/forms/Input';
import Select from '@/components/forms/Select';
import { useCreateVoter } from '@/hooks/queries/use-create-voter';
import { useImageUpload } from '@/hooks/queries/use-image-upload';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

export interface Voter {
  name: string;
  gender: string;
  address: string;
  dob: string;
  citizenship_no: string;
  password: string;
  documents: Array<{
    secure_url: string;
    public_id: string;
  }>;
}

const RegisterPage: NextPage = () => {
  const [documents, setDocuments] = useState<string[]>([]);

  const { mutate: uploadDocument, status: imageUploadStatus } =
    useImageUpload();

  const {
    mutate: createVoter,
    status: createVoterStatus,
    error: createVoterError,
  } = useCreateVoter();

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      for (const file of fileList) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setDocuments((prevValue) => [...prevValue, reader.result as string]);
        };
      }
    }
  };

  const submitHandler = (data: Voter) => {
    console.log(data);

    uploadDocument(documents, {
      onSuccess: (documentsUrl) => {
        createVoter({ ...data, documents: documentsUrl });
      },
    });
  };

  return (
    <div>
      <div className="max-w-[600px] mx-auto my-8">
        {createVoterStatus === 'success' ? (
          <SuccessMessage />
        ) : (
          <>
            <h2 className="mb-4 text-2xl font-bold">Voter Registration</h2>
            <FormWrapper
              showLoader={[imageUploadStatus, createVoterStatus].includes(
                'loading'
              )}
              className="space-y-4"
              onSubmit={submitHandler}
            >
              <Input name="name" label="Full Name" />

              <div className="flex items-center">
                <div className="basis-1/2">
                  <Select
                    name="gender"
                    options={{
                      Male: 'male',
                      Female: 'female',
                      Others: 'others',
                    }}
                  />
                </div>
                <div className="basis-1/2">
                  <Input type="date" name="dob" label="Date of Birth" />
                </div>
              </div>

              <Input name="address" label="Address" />
              <Input name="citizenship_no" label="Citizenship No." />
              <Input type="password" name="password" label="Password" />

              <div>
                <label
                  className="block mb-1 text-slate-600"
                  htmlFor="documents"
                >
                  Documents
                </label>
                <input
                  multiple
                  type="file"
                  id={'vote-documents'}
                  className=""
                  placeholder="Upload Image"
                  onChange={fileChangeHandler}
                />
                {imageUploadStatus === 'loading' && <span>Loading</span>}
                {imageUploadStatus === 'error' && <span>Error</span>}

                <div className="flex justify-between mt-2">
                  {documents.map((doc, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="max-w-[48%] border border-slate-300"
                      src={doc}
                      key={idx}
                    />
                  ))}
                </div>
              </div>

              {createVoterStatus === 'error' && (
                <p className="py-4 text-red-600 font-bold text-lg">
                  {createVoterError
                    ? createVoterError.msg
                    : 'Failed to register voter!'}
                </p>
              )}
            </FormWrapper>
          </>
        )}
      </div>
    </div>
  );
};

const SuccessMessage = () => (
  <div className="flex items-center gap-x-4">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        className="w-32 h-32 stroke-emerald-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div>
      <h2 className="mb-4 text-2xl font-bold">Voter Registered Successfully</h2>
      <p className="text-gray-600">
        Your documents will be checked for verification and if verified, you can
        see your name in the Voters List
      </p>
    </div>
  </div>
);

export default RegisterPage;
