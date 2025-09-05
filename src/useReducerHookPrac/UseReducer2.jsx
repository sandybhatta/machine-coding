// UseReducer2.jsx
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

/* ============================
   Minimal Vanilla CSS (scoped)
   ============================ */
const css = `
:root {
  --bg: #0f1115;
  --card: #151822;
  --muted: #9097a5;
  --text: #e6e9ef;
  --accent: #4f8cff;
  --accent-2: #7a59ff;
  --danger: #ff5d5d;
  --ok: #36d399;
  --border: #23283a;
}

* { box-sizing: border-box; }
body { margin: 0; }

.board-app {
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
  color: var(--text);
  background: radial-gradient(1200px 600px at 10% -20%, #1a1f2f 20%, #0f1115 60%);
  min-height: 100vh;
  padding: 24px;
}

.board-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: .2px;
}
.header-spacer { flex: 1; }

.button {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border: none;
  padding: 10px 12px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: transform .06s ease, opacity .2s ease;
}
.button:hover { transform: translateY(-1px); opacity: .95; }
.button.secondary {
  background: #20263a;
  color: var(--text);
  border: 1px solid var(--border);
}
.button.ghost {
  background: transparent;
  border: 1px dashed var(--border);
  color: var(--muted);
}
.button.danger {
  background: #2b1b1b;
  color: #ffb3b3;
  border: 1px solid rgba(255,93,93,.35);
}
.icon {
  opacity: .85;
  margin-right: 6px;
}

.board {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(300px, 1fr);
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.list {
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px;
  min-height: 140px;
}

.list.drag-over {
  outline: 2px dashed var(--accent);
  outline-offset: 2px;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.list-title {
  font-weight: 700;
  font-size: 14px;
  padding: 6px 8px;
  background: #1b2030;
  border: 1px solid var(--border);
  border-radius: 10px;
}
.list-actions {
  margin-left: auto;
  display: flex;
  gap: 6px;
}

.task {
  background: var(--card);
  border: 1px solid var(--border);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: grab;
}
.task:active { cursor: grabbing; }
.task.dragging {
  opacity: .55;
}
.task-header {
  display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
}
.task-text {
  font-size: 13px; line-height: 1.35;
  color: var(--text);
}

.task-actions {
  margin-left: auto; display: flex; gap: 6px;
}

.add-row {
  display: flex; gap: 8px; margin-top: 8px;
}

.input, .inline-input {
  width: 100%;
  background: #0f131f;
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 8px 10px;
  font-size: 13px;
}
.inline-input {
  background: #12182a;
  padding: 6px 8px;
}

.small {
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 8px;
}

.meta {
  color: var(--muted);
  font-size: 12px;
}

.toolbar {
  display: flex; gap: 8px; flex-wrap: wrap;
}

.footer-note {
  margin-top: 14px;
  color: var(--muted);
  font-size: 12px;
}

hr.sep {
  border: none; border-top: 1px solid var(--border); margin: 12px 0;
}

kbd {
  padding: 2px 6px; border: 1px solid var(--border); border-bottom-width: 2px;
  border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: #0c0f18; color: var(--text);
}
`;

/* ============================
   Utilities
   ============================ */
const uid = (prefix = "id") =>
  `${prefix}-${Math.random().toString(36).slice(2, 7)}-${Date.now().toString(36).slice(-4)}`;

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/* ============================
   Context & Reducer
   ============================ */
const BoardContext = createContext(null);
const useBoard = () => {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be used within BoardProvider");
  return ctx;
};

const initialBoard = {
  lists: [
    {
      id: "list-1",
      title: "Todo",
      tasks: [
        { id: "t-1", text: "Set up project structure" },
        { id: "t-2", text: "Define reducer action types" },
      ],
    },
    {
      id: "list-2",
      title: "In Progress",
      tasks: [{ id: "t-3", text: "Implement drag & drop (HTML5)" }],
    },
    {
      id: "list-3",
      title: "Done",
      tasks: [{ id: "t-4", text: "Create Context + Provider" }],
    },
  ],
};

const ACTIONS = {
  ADD_LIST: "ADD_LIST",
  EDIT_LIST_TITLE: "EDIT_LIST_TITLE",
  DELETE_LIST: "DELETE_LIST",
  REORDER_LISTS: "REORDER_LISTS",

  ADD_TASK: "ADD_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  REORDER_TASKS: "REORDER_TASKS",
  MOVE_TASK: "MOVE_TASK",
};

function boardReducer(state, action) {
  switch (action.type) {
    /* ===== Lists ===== */
    case ACTIONS.ADD_LIST: {
      const { title } = action;
      const next = deepClone(state);
      next.lists.push({ id: uid("list"), title: title || "Untitled", tasks: [] });
      return next;
    }
    case ACTIONS.EDIT_LIST_TITLE: {
      const { listId, title } = action;
      const next = deepClone(state);
      const list = next.lists.find((l) => l.id === listId);
      if (!list) return state;
      if (list.title === title) return state;
      list.title = title;
      return next;
    }
    case ACTIONS.DELETE_LIST: {
      const { listId } = action;
      const next = deepClone(state);
      const idx = next.lists.findIndex((l) => l.id === listId);
      if (idx === -1) return state;
      next.lists.splice(idx, 1);
      return next;
    }
    case ACTIONS.REORDER_LISTS: {
      const { fromIndex, toIndex } = action;
      if (fromIndex === toIndex) return state;
      const next = deepClone(state);
      if (
        fromIndex < 0 ||
        fromIndex >= next.lists.length ||
        toIndex < 0 ||
        toIndex >= next.lists.length
      )
        return state;
      const [moved] = next.lists.splice(fromIndex, 1);
      next.lists.splice(toIndex, 0, moved);
      return next;
    }

    /* ===== Tasks ===== */
    case ACTIONS.ADD_TASK: {
      const { listId, text } = action;
      const next = deepClone(state);
      const list = next.lists.find((l) => l.id === listId);
      if (!list) return state;
      list.tasks.push({ id: uid("t"), text: text || "New Task" });
      return next;
    }
    case ACTIONS.EDIT_TASK: {
      const { listId, taskId, text } = action;
      const next = deepClone(state);
      const list = next.lists.find((l) => l.id === listId);
      if (!list) return state;
      const task = list.tasks.find((t) => t.id === taskId);
      if (!task) return state;
      if (task.text === text) return state;
      task.text = text;
      return next;
    }
    case ACTIONS.DELETE_TASK: {
      const { listId, taskId } = action;
      const next = deepClone(state);
      const list = next.lists.find((l) => l.id === listId);
      if (!list) return state;
      const idx = list.tasks.findIndex((t) => t.id === taskId);
      if (idx === -1) return state;
      list.tasks.splice(idx, 1);
      return next;
    }
    case ACTIONS.REORDER_TASKS: {
      const { listId, fromIndex, toIndex } = action;
      if (fromIndex === toIndex) return state;
      const next = deepClone(state);
      const list = next.lists.find((l) => l.id === listId);
      if (!list) return state;
      if (
        fromIndex < 0 ||
        fromIndex >= list.tasks.length ||
        toIndex < 0 ||
        toIndex > list.tasks.length
      )
        return state;
      const [moved] = list.tasks.splice(fromIndex, 1);
      list.tasks.splice(toIndex, 0, moved);
      return next;
    }
    case ACTIONS.MOVE_TASK: {
      const { fromListId, toListId, fromIndex, toIndex } = action;
      const next = deepClone(state);
      const fromList = next.lists.find((l) => l.id === fromListId);
      const toList = next.lists.find((l) => l.id === toListId);
      if (!fromList || !toList) return state;
      if (fromIndex < 0 || fromIndex >= fromList.tasks.length) return state;

      const [moved] = fromList.tasks.splice(fromIndex, 1);
      const targetIndex = Math.max(0, Math.min(toIndex, toList.tasks.length));
      toList.tasks.splice(targetIndex, 0, moved);
      return next;
    }

    default:
      return state;
  }
}

function BoardProvider({ children }) {
  const STORAGE_KEY = "kanban-board-v1";

  const [state, dispatch] = useReducer(
    boardReducer,
    null,
    () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : initialBoard;
      } catch {
        return initialBoard;
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = { state, dispatch };
  return (
    <BoardContext.Provider value={value}>
      {/* inject CSS once */}
      <style>{css}</style>
      {children}
    </BoardContext.Provider>
  );
}

/* ============================
   Inline Editing Component
   ============================ */
function InlineEdit({ value, onSave, placeholder = "Enter text...", as = "input", className = "inline-input" }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value ?? "");

  useEffect(() => setText(value ?? ""), [value]);

  const commit = () => {
    const trimmed = text.trim();
    onSave(trimmed.length ? trimmed : value);
    setEditing(false);
  };

  if (!editing) {
    return (
      <div
        className={className + " list-title"}
        onClick={() => setEditing(true)}
        title="Click to edit"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setEditing(true); }}
      >
        {value || <span className="meta">{placeholder}</span>}
      </div>
    );
  }

  if (as === "textarea") {
    return (
      <textarea
        className="inline-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commit}
        autoFocus
        rows={3}
      />
    );
  }

  return (
    <input
      className="inline-input"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
      autoFocus
      placeholder={placeholder}
    />
  );
}

/* ============================
   Task Component
   ============================ */
function TaskCard({ listId, task, index }) {
  const { dispatch } = useBoard();
  const [isDragging, setDragging] = useState(false);

  const onDragStart = (e) => {
    setDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        kind: "task",
        fromListId: listId,
        taskId: task.id,
        fromIndex: index,
      })
    );
  };
  const onDragEnd = () => setDragging(false);

  return (
    <div
      className={"task" + (isDragging ? " dragging" : "")}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="task-header">
        <span className="meta">#{task.id}</span>
        <div className="task-actions">
          <button
            className="button small secondary"
            onClick={() => {
              const text = prompt("Edit task text:", task.text);
              if (text !== null)
                dispatch({ type: ACTIONS.EDIT_TASK, listId, taskId: task.id, text: text.trim() });
            }}
          >
            ✏️ Edit
          </button>
          <button
            className="button small danger"
            onClick={() => {
              if (confirm("Delete this task?"))
                dispatch({ type: ACTIONS.DELETE_TASK, listId, taskId: task.id });
            }}
          >
            🗑 Delete
          </button>
        </div>
      </div>
      <div className="task-text">{task.text}</div>
      <div className="toolbar" style={{ marginTop: 8 }}>
        <button
          className="button small ghost"
          title="Move up"
          onClick={() => dispatch({ type: ACTIONS.REORDER_TASKS, listId, fromIndex: index, toIndex: Math.max(0, index - 1) })}
        >
          ⬆️
        </button>
        <button
          className="button small ghost"
          title="Move down"
          onClick={() => dispatch({ type: ACTIONS.REORDER_TASKS, listId, fromIndex: index, toIndex: index + 1 })}
        >
          ⬇️
        </button>
      </div>
    </div>
  );
}

/* ============================
   List Column Component
   ============================ */
function ListColumn({ list, listIndex }) {
  const { dispatch, state } = useBoard();
  const [dragOver, setDragOver] = useState(false);
  const [newTask, setNewTask] = useState("");

  // Support dropping both tasks (for move/reorder) and lists (for reordering lists)
  const onDragOver = (e) => {
    // allow drop
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.kind === "task") {
        const { fromListId, fromIndex } = data;
        // drop at end of this list by default
        const toIndex = list.tasks.length;
        dispatch({
          type: ACTIONS.MOVE_TASK,
          fromListId,
          toListId: list.id,
          fromIndex,
          toIndex,
        });
      } else if (data.kind === "list") {
        const { fromIndex } = data;
        dispatch({
          type: ACTIONS.REORDER_LISTS,
          fromIndex,
          toIndex: listIndex,
        });
      }
    } catch {}
  };

  const onListDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        kind: "list",
        fromIndex: listIndex,
        listId: list.id,
      })
    );
  };

  return (
    <div
      className={"list" + (dragOver ? " drag-over" : "")}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div
        className="list-header"
        draggable
        onDragStart={onListDragStart}
        title="Drag to reorder lists"
      >
        <InlineEdit
          value={list.title}
          onSave={(val) => dispatch({ type: ACTIONS.EDIT_LIST_TITLE, listId: list.id, title: val })}
        />
        <div className="list-actions">
          <button
            className="button small ghost"
            title="Move list left"
            onClick={() =>
              dispatch({
                type: ACTIONS.REORDER_LISTS,
                fromIndex: listIndex,
                toIndex: Math.max(0, listIndex - 1),
              })
            }
          >
            ⬅️
          </button>
          <button
            className="button small ghost"
            title="Move list right"
            onClick={() =>
              dispatch({
                type: ACTIONS.REORDER_LISTS,
                fromIndex: listIndex,
                toIndex: Math.min(state.lists.length - 1, listIndex + 1),
              })
            }
          >
            ➡️
          </button>
          <button
            className="button small danger"
            onClick={() => {
              if (confirm(`Delete list "${list.title}"?`)) {
                dispatch({ type: ACTIONS.DELETE_LIST, listId: list.id });
              }
            }}
          >
            🗑
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div>
        {list.tasks.map((t, idx) => (
          <TaskDropZone
            key={`dz-${t.id}-before`}
            listId={list.id}
            index={idx}
          />
        ))}
        {/* Drop after last task */}
        <TaskDropZone key="dz-end" listId={list.id} index={list.tasks.length} />
        {list.tasks.map((t, idx) => (
          <TaskCard key={t.id} listId={list.id} task={t} index={idx} />
        ))}
      </div>

      {/* Add task */}
      <div className="add-row">
        <input
          className="input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task…"
          onKeyDown={(e) => {
            if (e.key === "Enter" && newTask.trim()) {
              dispatch({ type: ACTIONS.ADD_TASK, listId: list.id, text: newTask.trim() });
              setNewTask("");
            }
          }}
        />
        <button
          className="button small secondary"
          onClick={() => {
            if (!newTask.trim()) return;
            dispatch({ type: ACTIONS.ADD_TASK, listId: list.id, text: newTask.trim() });
            setNewTask("");
          }}
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
}

/* ============================
   TaskDropZone
   - precise drop between tasks
   ============================ */
function TaskDropZone({ listId, index }) {
  const { dispatch } = useBoard();
  const [over, setOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setOver(true);
  };
  const onDragLeave = () => setOver(false);
  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const raw = e.dataTransfer.getData("application/json");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (data.kind !== "task") return;
      const { fromListId, fromIndex } = data;
      dispatch({
        type: ACTIONS.MOVE_TASK,
        fromListId,
        toListId: listId,
        fromIndex,
        toIndex: index,
      });
    } catch {}
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        height: over ? 18 : 8,
        margin: "2px 0",
        borderRadius: 8,
        border: over ? "2px dashed var(--accent)" : "1px dashed transparent",
        transition: "all .08s ease",
      }}
      aria-label={`Drop position ${index}`}
    />
  );
}

/* ============================
   Board Root
   ============================ */
function Board() {
  const { state, dispatch } = useBoard();
  const [newList, setNewList] = useState("");

  return (
    <div className="board-app">
      <div className="board-header">
        <div className="title">Kanban Board — useReducer + useContext</div>
        <div className="header-spacer" />
        <div className="toolbar">
          <input
            className="input"
            style={{ width: 240 }}
            placeholder="New list title…"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newList.trim()) {
                dispatch({ type: ACTIONS.ADD_LIST, title: newList.trim() });
                setNewList("");
              }
            }}
          />
          <button
            className="button"
            onClick={() => {
              if (!newList.trim()) return;
              dispatch({ type: ACTIONS.ADD_LIST, title: newList.trim() });
              setNewList("");
            }}
          >
            <span className="icon">➕</span>Add List
          </button>
        </div>
      </div>

      <div className="board">
        {state.lists.map((list, idx) => (
          <ListColumn key={list.id} list={list} listIndex={idx} />
        ))}
      </div>

      <hr className="sep" />
      <div className="footer-note">
        <div><strong>Tips:</strong> Drag tasks between lists or within the same list to reorder. Drag list headers to reorder lists.</div>
        <div>Keyboard helpers: use the small ⬆️/⬇️ buttons on tasks and ⬅️/➡️ on lists. Inline edit list titles by clicking them. Use <kbd>Enter</kbd> to confirm.</div>
      </div>
    </div>
  );
}

/* ============================
   Default Export
   ============================ */
export default function UseReducer2() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}
