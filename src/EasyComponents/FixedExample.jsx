import { useEffect, useRef, useState } from 'react';

const FixedExample = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count; // always update the latest value
  }, [count]);

  useEffect(() => {
    let id=setTimeout(() => {
      alert(`Count is: ${count}`);
       // always the latest  
    }, 5000);


    return ()=>clearTimeout(id)
  },[count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
export default FixedExample