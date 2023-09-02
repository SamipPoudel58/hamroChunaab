import FormWrapper from '@/components/forms/FormWrapper';
import Input from '@/components/forms/Input';
import { useLoginVoter } from '@/hooks/queries/use-login-voter';
import { useRouter } from 'next/router';

export interface VoterLoginData {
  citizenship_no: string;
  password: string;
}

const LoginPage = () => {
  const { mutate: loginUser, isLoading, isError } = useLoginVoter();

  const router = useRouter();

  const submitHandler = (data: VoterLoginData) => {
    loginUser(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
    });
  };
  return (
    <div>
      <div className="max-w-[600px] mx-auto my-8">
        <h2 className="mb-4 text-2xl font-bold">Voter Login</h2>
        <FormWrapper
          showLoader={isLoading}
          className="space-y-4"
          onSubmit={submitHandler}
        >
          <Input name="citizenship_no" label="Citizenship No." />
          <Input type="password" name="password" label="Password" />
          {isError && <p>Login Failed!</p>}
        </FormWrapper>
      </div>
    </div>
  );
};

export default LoginPage;
