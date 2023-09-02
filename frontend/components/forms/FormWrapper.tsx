import { FormProvider, useForm } from 'react-hook-form';

const FormWrapper = ({
  className = '',
  onSubmit,
  children,
  showLoader,
}: {
  className?: string;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  showLoader: boolean;
}) => {
  const methods = useForm();
  const { handleSubmit, setError, setFocus } = methods;

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={handleSubmit(onSubmit)}>
        {children}
        <button
          className="text-white font-medium h-[64px] mt-4 bg-primary-light w-[200px] flex items-center justify-center"
          type="submit"
        >
          {showLoader ? <Spinner /> : 'Submit'}
        </button>
      </form>
    </FormProvider>
  );
};

const Spinner = () => (
  <div className="h-6 w-6 border-[4px] border-white border-solid border-t-white/30 rounded-full animate-spin"></div>
);

export default FormWrapper;
