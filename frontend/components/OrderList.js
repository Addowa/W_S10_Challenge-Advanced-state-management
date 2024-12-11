import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetOrdersQuery } from '../state/apiSlice'
import { setFilter } from '../state/filterSlice'

export default function OrderList() {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery()

  const handleFilterChange = (size) => {
    dispatch(setFilter(size))
  }

  const filteredOrders =
    filter === 'All' ? orders : orders.filter((order) => order.size === filter)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
      {isLoading && <div>Loading orders...</div>}
      {isError && <div >Error loading orders.</div>}
        {
          filteredOrders && filteredOrders.map((order) => {
            const fullName = order.customer
            const toppingsCount = order.toppings?.length || 0
            const toppingsText = toppingsCount > 0
              ? `${toppingsCount} topping${toppingsCount > 1 ? 's' : ''}`
              : 'no toppings'
            return (
              <li key={order.id}>
              <div>
                {fullName} ordered a size {order.size} with {toppingsText}
              </div>
              </li>
            )
          })
       }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${filter === size ? ' active' : ''}`
            return <button
                      onClick={() => handleFilterChange(size)}
                      data-testid={`filterBtn${size}`}
                      className={className}
                      key={size}
                  >
                      {size}
                  </button>
          })
        }
      </div>
    </div>
  )
}
