import React, { useRef } from "react";

export default function OTPForm() {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value && index < inputsRef.current.length - 1) {
      // Move focus to next input
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      // Move focus to previous input
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").split("");
    pasteData.forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char;
      }
    });
    // Focus last filled input
    if (inputsRef.current[pasteData.length - 1]) {
      inputsRef.current[pasteData.length - 1].focus();
    }
    // e.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        marginTop: "50px",
      }}
      onPaste={handlePaste}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "20px",
          }}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
        
      ))}
    </div>
  );
}
