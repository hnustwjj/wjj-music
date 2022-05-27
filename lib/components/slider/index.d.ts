import React from 'react';
/**
 * change:回调函数，在进度条（current百分比）发生改变时会执行
 * value:外部指定的宽度百分比
 */
declare type SliderProps = {
    direction: 'col' | 'row';
    value: number;
    initialValue: number;
    change?: (current: number) => void;
};
declare const Slider: React.MemoExoticComponent<(props: SliderProps) => JSX.Element>;
export default Slider;
