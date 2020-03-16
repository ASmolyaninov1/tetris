import React from 'react'
import styled from 'styled-components'

const Block = (props) => {
  return(
    <StyledBlock background={props.background}/>
  )
};

export default Block

const StyledBlock = styled.div`
  background: ${props => props.background === 0 ? 'blue' : 'red'};
  width: 28px;
  height: 28px;
  border: ${props => props.background === 0 ? '1px solid blue' : '1px solid black'};
`
