import styled from 'styled-components'
export default styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  /* 增加背景色，为了达到覆盖效果 */
  background: white;
  .icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    color: var(--icon);
    cursor: pointer;
    margin: 0 10px;
  }
  .text-22px {
    font-size: 22px;
  }
  .rounded-bg {
    background-color: rgba(42, 42, 45, 0.5);
    border-radius: 8888px;
    &:hover {
      background-color: rgb(55, 55, 58);
    }
  }
  .text-18px {
    font-size: 18px;
  }
  .volume-slider-hover {
    &:hover + div {
      opacity: 1;
    }
  }
`

export const NavButton = styled.button`
  height: 40px;
  padding: 0 23px;
  border-radius: 2px;
  margin-right: 8px;
  border: 1px solid rgba(235, 235, 235, 0.7);
  color: rgba(235, 235, 235, 0.7);
  font-weight: 100;
  font-size: 14px;
  &:hover,
  &.active {
    border-color: white;
    color: white;
  }
`
