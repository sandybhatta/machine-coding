import React, { useState } from 'react';

const TabSwitcher = () => {
  const tabs = [
    { id: "tab-1", label: "Tab 1", content: "This is Tab 1 content." },
    { id: "tab-2", label: "Tab 2", content: "Here is Tab 2 content." },
    { id: "tab-3", label: "Tab 3", content: "And this is Tab 3 content." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = (index) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <div>
      {/* Tab headers */}
      <div
        role="tablist"
        style={{ display: "flex", gap: 8, borderBottom: "1px solid #ddd" }}
      >
        {tabs.map((t, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={t.id ?? i}
              id={`${t.id ?? `tab-${i}`}-tab`}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => {
               
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(i);
                }
              }}
              style={{
                padding: "0.5rem 0.75rem",
                border: "none",
                borderBottom: isActive ? "3px solid black" : "3px solid transparent",
                background: "transparent",
                cursor: "pointer",
                fontWeight: isActive ? 700 : 500,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <div
        role="tabpanel"
        id={`${tabs[activeIndex].id ?? `tab-${activeIndex}`}-panel`}
        style={{ padding: "1rem 0" }}
      >
        {typeof tabs[activeIndex].content === "function"
          ? tabs[activeIndex].content()
          : tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default TabSwitcher;
