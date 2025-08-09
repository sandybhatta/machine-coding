// import React, { useEffect, useState } from 'react'

// const AutoSaveDarft = () => {
//     const [input, setInput] =useState("")
//     const[draft, setDraft]=useState("")

//     useEffect(()=>{

//         const id= setTimeout(()=>{
//             setDraft(input)
//         },2000)

//         return ()=>{
//             clearTimeout(id)
//         }

//     },[input])
//   return (
//     <div>
//         <input 
//         type='textarea'
//         value={input}
//         onChange={(e)=>setInput(e.target.value)}
//         />


//         <div>
//             {draft}
//         </div>
//     </div>
//   )
// }

// export default AutoSaveDarft

// slightly better version with better ux

import React, { useEffect, useState } from 'react';

const AutoSaveDraft = () => {
  const [input, setInput] = useState('');
  const [draft, setDraft] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    if (input.trim() === '') {
      setSavedMessage('');
      return;
    }

    const id = setTimeout(() => {
      setDraft(input);
      setSavedMessage('Saved draft');
      // Hide message after 1.5 sec (optional UX improvement)
      setTimeout(() => setSavedMessage(''), 1500);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [input]);

  return (
    <div style={{ padding: '20px' }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Start typing your blog..."
        rows="5"
        cols="40"
      />

      <div style={{ marginTop: '10px', color: 'green' }}>
        {savedMessage && <span>{savedMessage}</span>}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Last saved draft:</h4>
        <p>{draft}</p>
      </div>
    </div>
  );
};

export default AutoSaveDraft;
