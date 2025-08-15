import React, { useReducer, useEffect } from "react";

// ----------------- INITIAL STATE -----------------
const initialState = {
  currentStepIndex: 0,
  isSubmitted: false,
  isValid: false,
  formData: {
    personalInfo: {
      name: "",
      email: "",
      gender: "",
      age: ""
    },
    address: {
      city: "",
      district: "",
      state: "",
      zip: "",
      houseNo: ""
    },
    accountDetails: {
      bank: "",
      branch: "",
      accountId: "",
      accountHolderName: "",
      password: ""
    }
  },
  validationError: []
};

// ----------------- REDUCER FUNCTION -----------------
const reducerFn = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": {
      const { name, value } = action.payload;
      const stepKey = Object.keys(state.formData)[state.currentStepIndex];
      return {
        ...state,
        formData: {
          ...state.formData,
          [stepKey]: {
            ...state.formData[stepKey],
            [name]: value
          }
        }
      };
    }

    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStepIndex: state.currentStepIndex - 1,
        validationError: [],
        isValid: false
      };

    case "NEXT_STEP":
      return {
        ...state,
        currentStepIndex: state.currentStepIndex + 1,
        validationError: [],
        isValid: false
      };

    case "RESET_FORM":
      return { ...initialState };

    case "VALIDATE_STEP": {
      const stepKey = Object.keys(state.formData)[state.currentStepIndex];
      const values = state.formData[stepKey];
      let errors = [];

      for (let [key, value] of Object.entries(values)) {
        if (key === "name") {
          const notAllowedChars = ["!", "@", "#", "%", "^", "&", "*", "(", ")"];
          if (
            value.trim().length === 0 ||
            [...value].some((char) => notAllowedChars.includes(char))
          ) {
            errors.push("Name should only contain letters A-Z or a-z");
          }
        }

        if (key === "email" && !value.includes("@")) {
          errors.push("Email should contain @");
        }

        if (key === "gender") {
          const allowedGenders = ["male", "female"];
          if (!allowedGenders.includes(value.toLowerCase().trim())) {
            errors.push("Gender should be either male or female");
          }
        }

        if (key === "age" && Number(value) < 18) {
          errors.push("Age should be greater than or equal to 18");
        }

        if (key === "zip" && value.length !== 6) {
          errors.push("Zip should be exactly 6 digits");
        }

        if (key === "accountId" && value.length < 5) {
          errors.push("Account ID should be at least 5 characters");
        }
      }

      return {
        ...state,
        validationError: errors,
        isValid: errors.length === 0
      };
    }

    case "SUBMIT":
      return {
        ...state,
        isSubmitted: true
      };

    default:
      return state;
  }
};

// ----------------- COMPONENT -----------------
const FormWizard = () => {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const stepKeys = Object.keys(state.formData);
  const currentStepKey = stepKeys[state.currentStepIndex];
  const currentStepFields = state.formData[currentStepKey];

  // For debugging:
  useEffect(() => {
    console.log("Current State:", state);
  }, [state]);

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Step {state.currentStepIndex + 1}: {currentStepKey}</h2>

      {/* Render fields for current step */}
      {Object.keys(currentStepFields).map((fieldName) => (
        <div key={fieldName} style={{ marginBottom: "10px" }}>
          <label>
            {fieldName}:{" "}
            <input
              name={fieldName}
              value={currentStepFields[fieldName]}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  payload: { name: e.target.name, value: e.target.value }
                })
              }
            />
          </label>
        </div>
      ))}

      {/* Validation Errors */}
      {state.validationError.length > 0 && (
        <div style={{ color: "red" }}>
          {state.validationError.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => dispatch({ type: "PREVIOUS_STEP" })}
          disabled={state.currentStepIndex === 0}
        >
          Previous
        </button>

        {state.currentStepIndex < stepKeys.length - 1 ? (
          <button
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            disabled={!state.isValid}
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "SUBMIT" })}
            disabled={!state.isValid}
          >
            Submit
          </button>
        )}

        <button onClick={() => dispatch({ type: "VALIDATE_STEP" })}>
          Validate
        </button>

        <button onClick={() => dispatch({ type: "RESET_FORM" })}>
          Reset
        </button>
      </div>

      {/* Submission Message */}
      {state.isSubmitted && (
        <p style={{ color: "green", marginTop: "20px" }}>
           Form submitted successfully!
        </p>
      )}
    </div>
  );
};

export default FormWizard;
