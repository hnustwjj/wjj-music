import styled from 'styled-components'
export default styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 50;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
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
