import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.h1`
/* color:var(--color-facebookblue);
 */
`

const Mypage = () => {
  return (
      <Wrapper>
        <section>
          <div className='profile'>.
            <div className='profileImg'></div>
            <div className='profileCont'>
              <h1>박예림</h1>
              <p>8시간전</p>
            </div>
          </div>

        </section>
      </Wrapper>
  )
}

export default Mypage
