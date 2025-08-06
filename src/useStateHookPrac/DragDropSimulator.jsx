import React, { useState } from 'react'

const DragDropSimulator = () => {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5'
  ])

  const moveItemUp = (index) => {
    if (index === 0) return // can't move first item up

    const newItems = [...items]
    const temp = newItems[index - 1]
    newItems[index - 1] = newItems[index]
    newItems[index] = temp
    setItems(newItems)
  }

  const moveItemDown = (index) => {
    if (index === items.length - 1) return // can't move last item down

    const newItems = [...items]
    const temp = newItems[index + 1]
    newItems[index + 1] = newItems[index]
    newItems[index] = temp
    setItems(newItems)
  }

  const resetItems = () => {
    setItems([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5'
    ])
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Drag and Drop (Simulated)</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '6px'
            }}
          >
            <span>
              <strong>{index + 1}.</strong> {item}
            </span>
            <div>
              <button
                onClick={() => moveItemUp(index)}
                disabled={index === 0}
                style={{ marginRight: '5px' }}
              >
                Move Up
              </button>
              <button
                onClick={() => moveItemDown(index)}
                disabled={index === items.length - 1}
              >
                Move Down
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={resetItems}>Reset</button>
    </div>
  )
}

export default DragDropSimulator
