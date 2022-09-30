import { produce } from 'immer';
import { GLOBAL_TEMP_VARIABLE } from '@/redux/constants/global';

export interface GlobalModelState {
  globalTempVariable: any | null;
}

const getInitialState = () =>
  ({
    globalTempVariable: null,
  } as GlobalModelState);

const user = produce((draftState, action) => {
  switch (action.type) {
    case GLOBAL_TEMP_VARIABLE:
      draftState.globalTempVariable = { ...draftState.globalTempVariable, ...action.payload };
      break;
    default:
      break;
  }
}, getInitialState());

export default user;
