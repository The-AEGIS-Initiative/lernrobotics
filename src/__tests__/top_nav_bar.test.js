import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { render, fireEvent, cleanup } from '@testing-library/react'

import TopNavBar from '../components/top_nav_bar.js'
import { AppContext } from '../contexts/AppContext.js'

afterEach(cleanup)

function renderNavBar (isAuth, type) {
  return render(
    <BrowserRouter>
      <AppContext.Provider value={{ isAuth: isAuth }}>
        <TopNavBar type={type} />
      </AppContext.Provider>
    </BrowserRouter>
  )
}

test('Login button is visible when not authenticated', () => {
  const { queryByText } = renderNavBar(false, '') //

  expect(queryByText(/Login \/ Register/i)).toBeVisible()
})

test('Logout button is not visible when not authenticated', () => {
  const { queryByText } = renderNavBar(false, '') //

  expect(queryByText(/Logout/i)).toBeNull()
})

test('Login button is not visible when authenticated', () => {
  const { queryByText } = renderNavBar(true, '') //

  expect(queryByText(/Login \/ Register/i)).toBeNull()
})

test('Logout button is visible when authenticated', () => {
  const { getByText } = renderNavBar(true, '') //

  expect(getByText(/Logout/i).textContent).toBe('Logout')
})

test('Back button is visible in non-root pages', () => {
  const { getByText } = renderNavBar(true, '') //

  expect(getByText(/Home/i).textContent).toBe('Home')
})

test('Back button is not visible in homepage', () => {
  const { queryByText } = renderNavBar(true, 'main') //

  expect(queryByText(/Home/i)).toBeNull()
})
