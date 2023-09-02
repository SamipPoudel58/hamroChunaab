import CandidatesList from '@/components/CandidatesList';
import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/forms/Input';
import { useAddCandidate } from '@/hooks/queries/use-add-candidate';
import { useGetCandidates } from '@/hooks/queries/use-get-candidates';
import useUserStore from '@/store/user-store';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

export interface Candidate {
  _id: string;
  name: string;
  party: string;
}

const AdminDashboard = () => {
  const { name } = useUserStore((state) => state.loginDetail);

  const { mutate: addCandidate } = useAddCandidate();
  const { data: candidates } = useGetCandidates();

  const [isSSR, setIsSSR] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const queryClient = useQueryClient();

  const submitHandler = (data: Candidate) => {
    addCandidate(data, {
      onSuccess: () => {
        setShowForm(false);
        queryClient.invalidateQueries('candidates');
      },
    });
  };

  return (
    !isSSR && (
      <div className="max-w-[600px] mx-auto py-8">
        <h2 className="font-bold text-2xl text-center">Namaste, {name} Ji.</h2>

        <div className="flex items-end justify-between my-8">
          <p className="font-bold text-xl">List of Candidates</p>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="text-sky-500 font-medium"
          >
            {showForm ? 'Cancel' : '+ Add Candidates'}
          </button>
        </div>

        {showForm && (
          <FormWrapper
            showLoader={false}
            className="space-y-4"
            onSubmit={submitHandler}
          >
            <Input name="name" label="Full Name" />
            <Input name="party" label="Party" />
          </FormWrapper>
        )}

        <CandidatesList candidates={candidates} />
      </div>
    )
  );
};

export default AdminDashboard;
