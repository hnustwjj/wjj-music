import { TypedUseSelectorHook } from 'react-redux';
declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    music: import("./music").musicState;
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    music: import("./music").musicState;
}, import("redux").AnyAction, undefined>]>;
export default store;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppDispatch = typeof store.dispatch;
export declare const useAppDispatch: () => import("@reduxjs/toolkit").ThunkDispatch<{
    music: import("./music").musicState;
}, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("redux").AnyAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
