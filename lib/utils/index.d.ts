export interface lyricItem {
    time: number;
    content: string;
}
export declare function parseLyric(lyric: string): lyricItem[];
