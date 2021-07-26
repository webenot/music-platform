import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { createStore, Store } from 'redux';

import { reducer, TRootState } from 'store/reducers';

const makeStore: MakeStore<Store<TRootState>> = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<TRootState>>(makeStore, { debug: true });
