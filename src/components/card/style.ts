import styled from 'styled-components'
export const PanWrapper = styled.div`
  z-index: var(--pan-index);
  transition: all 0.5s;
  position: fixed;
  left: 3px;
  bottom: 50px;
  cursor: pointer;
  transform: translateX(-50%);
  &.active {
    transform: translate(25px, -215px);
  }
  &:hover.deactive {
    transform: translateX(0);
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
  height: var(--card-height);
  width: var(--card-width);
  position: fixed;
  left: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.375rem;
  z-index: var(--card-index);
  transform: scale(0) translate(-500px, 500px);
  opacity: 0;
  background-size: cover;
  background-repeat: no-repeat;
  &.active {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 20px;

    &:hover {
      transform: translateY(-50%) scale(1.2);
    }
  }
  .blur-8px {
    filter: blur(8px);
  }
  .blur-5px {
    filter: blur(5px);
  }
  .blur-2px {
    filter: blur(2px);
  }

  .volume-slider-hover {
    &:hover + div {
      opacity: 1;
    }
  }
`
