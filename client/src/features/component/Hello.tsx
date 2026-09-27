import { useState } from 'react';


export const Hello : any = () => {

  const [count, setCount] = useState(0);

  return (
    <div className=' '>
    <div className="flex flex-col items-center jsutify-center gap-4">
          
      </div>
      <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
      </button>
    </div>
  )
}