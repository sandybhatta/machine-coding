import React, { useState } from 'react'

const MultiStepForm = () => {
  const [form, setForm] = useState({
    0: { name: '', email: '' },
    1: { address: '', city: '' },
    2: { skill: '', programmingLanguages: '', tools: '' }
  })

  const [activePage, setActivePage] = useState(0)
  const [isSubmit, setSubmit] = useState(false)

  const handleChange = (i, value) => {
    const key = Object.keys(form[activePage])[i]
    setForm({
      ...form,
      [activePage]: {
        ...form[activePage],
        [key]: value,
      }
    })
  }

  const handleNext = () => {
    if (activePage < Object.keys(form).length - 1) {
      setActivePage(activePage + 1)
    }
  }

  const handlePrevious = () => {
    if (activePage > 0) {
      setActivePage(activePage - 1)
    }
  }

  const handleSubmit = () => {
    setSubmit(true)
  }

  return (
    <div>
      <h2>Step {activePage + 1}</h2>

      {Object.keys(form[activePage]).map((key, i) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            value={form[activePage][key]}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}

      <br />

      <button onClick={handlePrevious} disabled={activePage === 0}>
        Back
      </button>

      <button onClick={activePage < Object.keys(form).length - 1 ? handleNext : handleSubmit}>
        {activePage < Object.keys(form).length - 1 ? 'Next' : 'Submit'}
      </button>

      {isSubmit && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data</h3>
          {Object.keys(form).map((sectionKey) => (
            <div key={sectionKey}>
              {Object.entries(form[sectionKey]).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiStepForm
