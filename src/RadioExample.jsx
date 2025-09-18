import React, { useState } from "react";

export default function RadioExample() {
  const [selected, setSelected] = useState(""); // stores one choice

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <h2>Select your favorite language:</h2>

      <label>
        <input
          type="radio"
          name="language"
          value="JavaScript"
          checked={selected === "JavaScript"}
          onChange={handleChange}
        />
        JavaScript
      </label>

      <label>
        <input
          type="radio"
          name="language"
          value="Python"
          checked={selected === "Python"}
          onChange={handleChange}
        />
        Python
      </label>

      <label>
        <input
          type="radio"
          name="language"
          value="C++"
          checked={selected === "C++"}
          onChange={handleChange}
        />
        C++
      </label>

      <p>Selected: {selected}</p>
    </div>
  );
}
