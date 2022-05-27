import { SyntheticEvent } from 'react';
export declare const INITIAL_VOLUME = 0.66;
export default function useDuration(musicList: any[], currentMusic: any): {
    switchMusicStaus: () => void;
    isPlaying: boolean;
    setIsPlaying: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    duration: number;
    audioRef: import("react").RefObject<HTMLAudioElement>;
    switchMusic: (type: 'pre' | 'next') => Promise<void>;
    canplay: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
    setVolume: import("react").Dispatch<import("react").SetStateAction<number>>;
    volume: number;
};
