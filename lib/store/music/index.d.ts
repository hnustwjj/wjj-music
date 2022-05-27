export interface musicState {
    musicList: any[];
    currentMusic: any;
    currentLyric: string;
}
declare const _default: import("redux").Reducer<musicState, import("redux").AnyAction>;
export default _default;
export declare const changeMusicList: import("@reduxjs/toolkit").ActionCreatorWithPayload<any[], string>, changeCurrentMusic: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>, changeCurrentLyric: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, string>;
export * from './asyncAction';
