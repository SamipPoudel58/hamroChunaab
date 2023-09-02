import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/forms/Input';
import { useLoginVoter } from '@/hooks/queries/use-login-voter';
import useUserStore from '@/store/user-store';
import { useRouter } from 'next/router';

export interface VoterLoginData {
  citizenship_no: string;
  password: string;
}

export type VoterLoginResponse = {
  _id: string;
  name: string;
  citizenship_no: number;
  token: string;
  admin: boolean;
};

const LoginPage = () => {
  const { mutate: loginUser, isLoading, isError } = useLoginVoter();
  const setLoginDetail = useUserStore((state) => state.setLoginDetail);

  const router = useRouter();

  const submitHandler = (data: VoterLoginData) => {
    loginUser(data, {
      onSuccess: (data) => {
        setLoginDetail({
          _id: data._id,
          name: data.name,
          citizenship_no: data.citizenship_no,
          token: data.token,
          admin: data.admin,
        });
        if (data.admin) {
          router.push('/admin-dashboard');
        } else {
          router.push('/dashboard');
        }
      },
    });
  };
  return (
    <div>
      <div className="max-w-[600px] mx-auto my-8">
        <h2 className="mb-4 text-2xl font-bold">Voter Login</h2>
        {isError && (
          <p className="text-red-600 font-bold my-4">Login Failed!</p>
        )}
        <FormWrapper
          showLoader={isLoading}
          className="space-y-4"
          onSubmit={submitHandler}
        >
          <Input name="citizenship_no" label="Citizenship No." />
          <Input type="password" name="password" label="Password" />
        </FormWrapper>
      </div>
    </div>
  );
};

export default LoginPage;
