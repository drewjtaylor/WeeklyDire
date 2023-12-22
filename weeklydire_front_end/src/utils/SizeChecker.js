import React from 'react'

/**
 * Returns a responsive component to track the bootstrap size of the viewport
 * 
 */
const SizeChecker = () => {
  return (
    <>
        <p className='text-center d-block d-sm-none'>Size: XS</p>
        <p className='text-center d-none d-sm-block d-md-none'>Size: SM</p>
        <p className='text-center d-none d-md-block d-lg-none'>Size: MD</p>
        <p className='text-center d-none d-lg-block d-xl-none'>Size: LG</p>
        <p className='text-center d-none d-xl-block'>Size: XL</p>
    </>
  )
}

export default SizeChecker