import { VoterLoginResponse } from '@/pages/login';
import useUserStore from '@/store/user-store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Header = () => {
  const { token } = useUserStore((state) => state.loginDetail);
  const setLoginDetail = useUserStore((state) => state.setLoginDetail);

  const router = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    !isSSR && (
      <nav className="bg-gradient-to-tr from-primary to-primary-light bg-primary-light p-6 flex justify-between items-center">
        <div className="text-slate-100">
          <h1 className="font-bold text-2xl">Hamro Chunaab</h1>
          <p className="font-medium">Digital Election Application</p>
        </div>

        <div className="flex gap-x-2 text-white text-sm font-medium">
          {!token ? (
            <>
              <a
                className="block px-6 py-2 border-2 border-white"
                href="/register"
              >
                Register
              </a>
              <a
                className="block px-6 py-2 border-2 border-white"
                href="/login"
              >
                Login
              </a>
            </>
          ) : (
            <>
              <button
                className="block px-6 py-2 border-2 border-white"
                onClick={() => {
                  setLoginDetail({} as VoterLoginResponse);
                  router.push('/');
                }}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </nav>
    )
  );
};

export default Header;
