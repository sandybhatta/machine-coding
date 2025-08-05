import React, { useState } from 'react'

const MiniCart = () => {
    const cartItems=[
        {id:"1",product:"Apple", price:50, quantity:0},
        {id:"2",product:"Banana", price:30, quantity:0},
        {id:"3",product:"Mango", price:90, quantity:0},
        {id:"4",product:"Grape", price:120, quantity:0},
    ]
    const[cart, setCart] = useState(cartItems)
    const total ={
        products:[],
        quantity:0,
        amount:0
    }
     cart.forEach(cartItem=>{
        
        if(cartItem.quantity>0){
            total.products.push(cartItem.product)
            total.amount+= cartItem.price *cartItem.quantity
        }
        total.quantity=total.quantity+cartItem.quantity;
        
    })
    const  decrease=(id)=>{
        setCart(cart.map(cartItem=>
            cartItem.id===id?{...cartItem, quantity:cartItem.quantity-1}:cartItem
        ))
    }
    const  increase=(id)=>{
        setCart(cart.map(cartItem=>
            cartItem.id===id?{...cartItem, quantity:cartItem.quantity+1}:cartItem
        ))
    }
  return (
    <div>
        {
            cart.map(cartItem=>{
                return(
                    <li key={cartItem.id}>
                    <div>{cartItem.product}</div>
                    <div>{cartItem.price}</div>
                    <div>
                        <button onClick={()=>decrease(cartItem.id)} disabled={cartItem.quantity===0}>-</button>
                        {cartItem.quantity}
                        <button onClick={()=>increase(cartItem.id)}>+</button>
                    </div>
                    </li>
                )
            })
           
        }
        <div>
            <p>your selected products are: {
            total.products.map(t=>{
                return <span>{t}</span>
            })
            }</p>
            <p> total quantity is {total.quantity} and total amount is {total.amount}</p>
        </div>
    </div>
  )
}

export default MiniCart


// 🛒 Mini Cart
// -----------------------------
// Apple       ₹50     [−] 1 [+]
// Banana      ₹30     [−] 2 [+]
// Mango       ₹60     [−] 0 [+]

// -----------------------------
// 🧾 Total Items: 3
// 💰 Total Price: ₹110