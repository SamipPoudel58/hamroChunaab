import { VoterLoginResponse } from '@/pages/login';
import create, { SetState } from 'zustand';

interface UserState {
  loginDetail: VoterLoginResponse;
  setLoginDetail: (value: VoterLoginResponse) => void;
  //   id: string;
  //   setId: (val: string) => void;
  //   name: string;
  //   setName: (val: string) => void;
  //   citizenship_no: string;
  //   setCitizenshipNo: (val: string) => void;
  //   token: string;
  //   setToken: (val: string) => void;
}

let store = (set: SetState<UserState>) => ({
  loginDetail: {} as VoterLoginResponse,
  setLoginDetail: (value: VoterLoginResponse) => set({ loginDetail: value }),
  //   id: '',
  //   setId: (value: string) => set({ id: value }),

  //   name: '',
  //   setName: (value: string) => set({ name: value }),

  //   citizenship_no: '',
  //   setCitizenshipNo: (value: string) => set({ citizenship_no: value }),

  //   token: '',
  //   setToken: (value: string) => set({ token: value }),
});

const useUserStore = create<UserState>(store);

export default useUserStore;
