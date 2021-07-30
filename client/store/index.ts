import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { reducer, TRootState } from 'store/reducers';

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore<Store<TRootState>> = () =>
  createStore(reducer, bindMiddleware([ thunk ]));

// export an assembled wrapper
export const wrapper = createWrapper<Store<TRootState>>(makeStore, { debug: true });

export type TNextThunkDispatch = ThunkDispatch<TRootState, void, AnyAction>;
