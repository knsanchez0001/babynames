import React from 'react'

const IntroSection = ({child}) => {
  return (
    <section>
        <div className='wrapper'>
          {child}
        </div>
    </section>
  )
}

IntroSection.defaultProps = {
  child : <></>
}

export default IntroSection