import { HYDRATE } from 'next-redux-wrapper';

export interface IHydrate {
  type: typeof HYDRATE;
  payload: { count: number };
}
