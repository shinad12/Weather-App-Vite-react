import React from 'react'
   {/*code for current Time and Location  */}
   
function TimeAndLocation({weather : {formattedLocalTime, name, country},}) {
  return (
    <div>
      <div className='flex items-center justify-center my-6'>
        <p className='text-xl font-extralight'> {/*Sunday, 23 November 2024 | Local time 10:00 PM*/}
          {formattedLocalTime}
        </p>

      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-3xl font-medium'>{/*Qatar, Qa*/} {`${name}, ${country}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation