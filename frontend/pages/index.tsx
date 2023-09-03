import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  return (
    <div>
      <div className="max-w-[1000px] mx-auto pt-32">
        <h1 className="text-4xl font-bold text-center">
          Nepal&apos;s Best Digital Voting System
        </h1>
        <p className="max-w-[600px] mx-auto text-center mt-4 text-gray-500">
          Secure and easy voting app made with the ambition of making election
          process secure and easy for all the citizens.{' '}
        </p>
        <div className="flex justify-center mt-8 gap-x-2 text-primary text-sm font-medium">
          <a
            className="block px-6 py-2 border-2 border-primary"
            href="/register"
          >
            Register
          </a>
          <a className="block px-6 py-2 border-2 border-primary" href="/login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
