import React, { useReducer, useEffect, useContext, useState } from "react";

/* ------------------ 1. Context & Reducer ------------------ */

// Initial state
const initialState = {
  items: [], // { id, name, price, qty }
  discounts: [],
  subtotal: 0,
  total: 0,
};

// Discount Rules
function calculateDiscounts(state) {
  const discounts = [];
  let subtotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  let total = subtotal;

  // Rule 1: Buy 2 iPhones -> Get 1 Charger Free
  const iphone = state.items.find((p) => p.id === "iphone");
  if (iphone && iphone.qty >= 2) {
    const charger = state.items.find((p) => p.id === "charger");
    if (charger) {
      const discount = charger.price;
      total -= discount;
      discounts.push({ name: "Buy 2 iPhones Get Charger Free", amount: discount });
    }
  }

  // Rule 2: 10% off if total > 100000
  if (subtotal > 100000) {
    const discount = subtotal * 0.1;
    total -= discount;
    discounts.push({ name: "10% off on > ₹100000", amount: discount });
  }

  // Rule 3: Flat 200 off if more than 3 unique items
  if (state.items.length > 3) {
    total -= 200;
    discounts.push({ name: "Flat ₹200 off (3+ unique items)", amount: 200 });
  }

  return { discounts, subtotal, total };
}

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      let items;
      if (exists) {
        items = state.items.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        items = [...state.items, { ...action.payload, qty: 1 }];
      }
      const { discounts, subtotal, total } = calculateDiscounts({ ...state, items });
      return { ...state, items, discounts, subtotal, total };
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload.id);
      const { discounts, subtotal, total } = calculateDiscounts({ ...state, items });
      return { ...state, items, discounts, subtotal, total };
    }

    case "UPDATE_QTY": {
      const items = state.items.map((i) =>
        i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
      );
      const { discounts, subtotal, total } = calculateDiscounts({ ...state, items });
      return { ...state, items, discounts, subtotal, total };
    }

    case "RESET_CART": {
      return initialState;
    }

    case "INIT_FROM_STORAGE": {
      return action.payload;
    }

    default:
      return state;
  }
}

// Context
const CartContext = React.createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      dispatch({ type: "INIT_FROM_STORAGE", payload: JSON.parse(saved) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

/* ------------------ 2. Components ------------------ */

// Product Listing
function ProductList() {
  const { dispatch } = useCart();
  const products = [
    { id: "iphone", name: "iPhone", price: 50000 },
    { id: "headphones", name: "Headphones", price: 2000 },
    { id: "charger", name: "Charger", price: 1000 },
    { id: "case", name: "Phone Case", price: 500 },
  ];

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          {p.name} - ₹{p.price}
          <button onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

// Cart Items
function Cart() {
  const { state, dispatch } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {state.items.length === 0 && <p>Cart is empty</p>}
      {state.items.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          {item.name} (₹{item.price})  
          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_QTY",
                payload: { id: item.id, qty: Number(e.target.value) },
              })
            }
          />
          <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item })}>
            Remove
          </button>
        </div>
      ))}
      {state.items.length > 0 && (
        <button onClick={() => dispatch({ type: "RESET_CART" })}>
          Reset Cart
        </button>
      )}
    </div>
  );
}

// Cart Summary
function CartSummary() {
  const { state } = useCart();

  return (
    <div>
      <h2>Summary</h2>
      <p>Subtotal: ₹{state.subtotal}</p>
      <ul>
        {state.discounts.map((d, idx) => (
          <li key={idx}>
            {d.name}: -₹{d.amount}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{state.total}</h3>
    </div>
  );
}

/* ------------------ 3. App ------------------ */

export default function ShoppingCart() {
  return (
    <CartProvider>
      <h1>Shopping Cart with Discounts</h1>
      <div style={{ display: "flex", gap: "40px" }}>
        <ProductList />
        <Cart />
        <CartSummary />
      </div>
    </CartProvider>
  );
}
