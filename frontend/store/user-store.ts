import { VoterLoginResponse } from '@/pages/login';
import create, { SetState } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  loginDetail: VoterLoginResponse;
  setLoginDetail: (value: VoterLoginResponse) => void;
  hasVoted: boolean;
  setHasVoted: (value: boolean) => void;
}

let store = (set: SetState<UserState>) => ({
  loginDetail: {} as VoterLoginResponse,
  setLoginDetail: (value: VoterLoginResponse) => set({ loginDetail: value }),
  hasVoted: false,
  setHasVoted: (value: boolean) => set({ hasVoted: value }),
});

let persistedStore = persist(store, {
  name: 'user-store',
  getStorage: () => sessionStorage,
});

const useUserStore = create<UserState>(persistedStore);

export default useUserStore;
