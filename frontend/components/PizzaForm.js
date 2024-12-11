import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useCreateOrderMutation } from '../state/apiSlice'
import { updateField, resetForm } from '../state/formSlice'

export default function PizzaForm() {
  const dispatch = useDispatch()
  const formState = useSelector((state) => state.form)
  const [createOrder, { isLoading, error }] = useCreateOrderMutation()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    dispatch(updateField({ name, value: type === 'checkbox' ? checked : value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const toppings = Object.keys(formState.toppings)
      .filter((key) => formState.toppings[key])
      .map((key) => key)

    const order = {
      fullName: formState.fullName,
      size: formState.size,
      toppings,
    }

    try {
      await createOrder(order).unwrap()
      dispatch(resetForm())
    } catch (err) {
      console.error('Order submission failed:', err)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: {error.data?.message || 'Order failed'}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            data-testid="sizeSelect" 
            id="size" 
            name="size" 
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input 
            data-testid="checkPepperoni" 
            name="1" 
            type="checkbox" 
            checked={formState.toppings['1']}
            onChange={handleChange}
          />
          Pepperoni<br /></label>
        <label>
          <input 
            data-testid="checkGreenpeppers" 
            name="2" 
            type="checkbox" 
            checked={formState.toppings['2']}
            onChange={handleChange}
          />
          Green Peppers<br /></label>
        <label>
          <input 
            data-testid="checkPineapple" 
            name="3" 
            type="checkbox" 
            checked={formState.toppings['3']}
            onChange={handleChange}
          />
          Pineapple<br /></label>
        <label>
          <input 
            data-testid="checkMushrooms" 
            name="4" 
            type="checkbox" 
            checked={formState.toppings['4']}
            onChange={handleChange}
          />
          Mushrooms<br /></label>
        <label>
          <input 
            data-testid="checkHam" 
            name="5" 
            type="checkbox" 
            checked={formState.toppings['5']}
            onChange={handleChange}
          />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" disabled={isLoading} />
    </form>
  )
}
