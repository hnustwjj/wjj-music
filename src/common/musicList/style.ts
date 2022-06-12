import styled from 'styled-components'
export const SingerSpan = styled.span`
  flex: 5;
  position: relative;
  .delete {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 50%;
    border-radius: 50%;
    border: 2px solid white;
    transform: translateY(-50%) rotate(45deg);
    opacity: 0;
    transition: opacity 0.3s;
    &::before {
      content: '';
      width: 50%;
      height: 2px;
      background-color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &::after {
      content: '';
      width: 2px;
      height: 50%;
      background-color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:hover .delete {
    opacity: 1;
  }
`
