import styled from 'styled-components'
export default styled.div`
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  background: #9e9e9f;
  &.col {
    width: 5px;
    height: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: rotate(-180deg);
  }

  &.row {
    width: 95%;
    height: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .button {
    div {
      transition: all 0.5s;
    }
    &:hover > div {
      width: 10px;
      height: 10px;
    }
  }
`
