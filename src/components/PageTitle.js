import React from 'react'

function PageTitle({title}) {
  return (
    <div>
        <h1 className='text-2xl uppercase p-2 m-0' style={{textAlign: 'center', color: 'white'}}>{title}</h1>
    </div>
  )
}

export default PageTitle