import React from 'react'
import './login.css'


import { useState } from 'react'
import { onLogin } from '../../APIs/auth'

import { useDispatch } from 'react-redux'
import { authenticateUser } from '../../redux/slices/authSlice'



const Login = () => {
  const [values, setValues] = useState({

    email: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // const dispatch = useDispatch()
  
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authenticateUser())

      localStorage.setItem('isAuth', 'true')
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  
}
  
  return (
    <div className='foto_login'>
   
    <div class= "container" >
        <h1> Login</h1>
        <form onSubmit={(e) =>(e)}>
          
        <div className='input-data'>
            <label htmlFor='email'>Email address</label>
            <input
              autoFocus
              onChange={(e) => onChange(e)}
              type='email'
              autoComplete='off'
              id='email'
              name='email'
              value={values.email}
              
              required
            />
        </div>

        <div className='input-data'>
            <label>Password</label>
            <input
              onChange={(e) => onChange(e)}
              type='password'
              value={values.password}
              autoComplete='off'
              id='password'
              name='password'
              
              required
            />
        </div>

          <div style={{ color: 'greenyellow', margin: '10px 0' }}>{error}</div>

          <button type='submit'> Submit </button>

        
      </form>
    </div>
  
    </div>
  )
}

export default Login