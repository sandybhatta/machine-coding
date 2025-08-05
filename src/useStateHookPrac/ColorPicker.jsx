import React, { useState } from 'react'

const ColorPicker = () => {
    const colors = ["red", "green", "blue", "yellow","pink" ]
    const[ select , setSelect ] = useState(-1)
  return (
    <div>
    {
        colors.map((color,ind)=>(
            <button key={ind} onClick={()=>setSelect(ind)} style={{background:`${ind===select?colors[select]:"white"}`}}>{color}</button>
        ))
    }  
    <div style={{width:"100px",height:"100px" }}>
        
        </div>  
    </div>
  )
}

export default ColorPicker





// import React, { useState } from "react";

// const ColorPicker = () => {
//   // Use stable identity (value) and better labels
//   const colors = [
//     { label: "Red", value: "red" },
//     { label: "Green", value: "green" },
//     { label: "Blue", value: "blue" },
//     { label: "Yellow", value: "yellow" },
//     { label: "Pink", value: "pink" },
//   ];

//   // Store the color value instead of an index
//   const [selectedColor, setSelectedColor] = useState(null);

//   const isSelected = (value) => value === selectedColor;

//   return (
//     <div style={{ fontFamily: "sans-serif", padding: 12 }}>
//       {/* Controls */}
//       <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
//         {colors.map(({ label, value }) => (
//           <button
//             key={value}
//             onClick={() => setSelectedColor(value)}
//             // aria-pressed={isSelected(value)}
//             style={{
//               padding: "8px 12px",
//               borderRadius: 8,
//               border: isSelected(value) ? "2px solid black" : "1px solid #ccc",
//               background: isSelected(value) ? value : "white",
//               // Improve legibility for light backgrounds
//               color: isSelected(value) && (value === "yellow" || value === "pink") ? "#222" : "white",
//               // If not selected, use normal text color
//               ...(isSelected(value) ? {} : { color: "#222" }),
//               cursor: "pointer",
//               outlineOffset: 2,
//             }}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* Preview box that meets the requirement */}
//       <div
//         role="region"
//         // aria-label="Color preview"
//         style={{
//           width: 240,
//           height: 120,
//           borderRadius: 12,
//           border: "1px solid #ddd",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: selectedColor || "#f5f5f5",
//         }}
//       >
//         <span style={{ fontWeight: 600 }}>
//           {selectedColor ? `Selected: ${selectedColor}` : "Pick a color"}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ColorPicker;
