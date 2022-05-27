/// <reference types="react" />
export default function useGetOffset(lineRef: React.RefObject<HTMLDivElement>): (e: MouseEvent, direction: 'col' | 'row') => number;
