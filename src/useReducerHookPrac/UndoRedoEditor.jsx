import React, { useReducer, useEffect } from "react";

// 1️⃣ Reducer function
function editorReducer(state, action) {
  switch (action.type) {
    case "TYPE": {
      const newText = state.text + action.char;
      return {
        text: newText,
        history: [...state.history, state.text],
        future: [], // clear redo stack after new typing
      };
    }
    case "DELETE": {
      if (state.text.length === 0) return state;
      const newText = state.text.slice(0, -1);
      return {
        text: newText,
        history: [...state.history, state.text],
        future: [],
      };
    }
    case "UNDO": {
      if (state.history.length === 0) return state;
      const prev = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return {
        text: prev,
        history: newHistory,
        future: [state.text, ...state.future],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        text: next,
        history: [...state.history, state.text],
        future: newFuture,
      };
    }
    case "RESET": {
      return { text: "", history: [], future: [] };
    }
    case "INIT": {
      return action.payload;
    }
    default:
      return state;
  }
}

// 2️⃣ Initial State
const initialState = { text: "", history: [], future: [] };

export default function UndoRedoEditor() {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  // 3️⃣ Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("draft");
    if (saved) {
      dispatch({ type: "INIT", payload: JSON.parse(saved) });
    }
  }, []);

  // 4️⃣ Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("draft", JSON.stringify(state));
  }, [state]);

  // 5️⃣ Keyboard Shortcuts (Ctrl+Z, Ctrl+Y)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        dispatch({ type: "UNDO" });
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        dispatch({ type: "REDO" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Undo/Redo Text Editor</h2>

      <textarea
        style={styles.textarea}
        value={state.text}
        onChange={(e) => {
          const newText = e.target.value;
          // detect typing vs deleting
          if (newText.length > state.text.length) {
            const addedChar = newText[newText.length - 1];
            dispatch({ type: "TYPE", char: addedChar });
          } else {
            dispatch({ type: "DELETE" });
          }
        }}
        placeholder="Start typing here..."
      />

      <div style={styles.buttons}>
        <button
          style={styles.button}
          onClick={() => dispatch({ type: "UNDO" })}
          disabled={state.history.length === 0}
        >
          Undo
        </button>
        <button
          style={styles.button}
          onClick={() => dispatch({ type: "REDO" })}
          disabled={state.future.length === 0}
        >
          Redo
        </button>
        <button style={styles.button} onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </div>

      <div style={styles.stats}>
        <p>Characters: {state.text.length}</p>
        <p>Words: {state.text.trim() === "" ? 0 : state.text.trim().split(/\s+/).length}</p>
      </div>
    </div>
  );
}

// 6️⃣ Inline CSS styles
const styles = {
  container: {
    width: "500px",
    margin: "40px auto",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "15px",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #aaa",
    borderRadius: "6px",
    resize: "none",
    outline: "none",
  },
  buttons: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    transition: "0.2s",
  },
  stats: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333",
    display: "flex",
    justifyContent: "space-between",
  },
};
