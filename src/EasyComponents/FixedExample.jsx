import { useEffect, useRef, useState } from 'react';

const FixedExample = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count; // always update the latest value
  }, [count]);

  useEffect(() => {
    setTimeout(() => {
      alert(`Count is: ${countRef.current}`); // always the latest
    }, 3000);
  },[count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
export default FixedExample