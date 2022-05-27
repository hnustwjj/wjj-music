import styled from 'styled-components'
export const PanWrapper = styled.div`
  z-index: 52;
  transition: all 0.5s;
  position: fixed;
  left: 3px;
  bottom: 20px;
  cursor: pointer;
  transform: translateX(-50%);
  &.active {
    transform: translate(25px, -215px);
  }
  &:hover.deactive {
    transform: translateX(0);
  }
  * {
    transition: all 0.5s;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
      Lato, Roboto, PingFang SC, Microsoft YaHei, sans-serif !important;
  }
  @keyframes cycle {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .bg-pan {
    background-size: 100%;
    animation: cycle infinite 10s linear;
    &:hover {
      box-shadow: 0 0 15px white;
    }
    &.pause {
      /* 暂停动画 */
      animation-play-state: paused;
    }
  }
`

export const CardWrapper = styled.div`
  height: 300px;
  width: 300px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.375rem;
  z-index: 51;
  transform: scale(0) translate(-500px, 500px);
  opacity: 0;
  background-size: 100%;
  transition: all 0.5s;
  * {
    transition: all 0.5s;
  }
  .active-lyric {
    font-weight: 600;
    color: white;
    transform: scale(1.2);
  }
  &.active {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }

  .arrow {
    color: white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 20px;

    &:hover {
      transform: translateY(-50%) scale(1.2);
    }
  }
  .blur-10px {
    filter: blur(10px);
  }
  .blur-5px {
    filter: blur(5px);
  }
  .blur-2px {
    filter: blur(2px);
  }
  .icon {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    color: white;
    cursor: pointer;
  }

  .volume-slider-hover {
    &:hover + div {
      opacity: 1;
    }
  }
`
