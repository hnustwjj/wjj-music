/// <reference types="react" />
import { lyricItem } from '@/utils/index';
export default function useLyric(): {
    updateTime: (e: any, fuzzy?: boolean) => void;
    currentLyricIndex: number;
    lyricList: lyricItem[];
    lyricBox: import("react").RefObject<HTMLDivElement>;
};
