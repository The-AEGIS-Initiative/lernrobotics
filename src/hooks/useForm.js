import { useState } from 'react'

/** Hook to simplify form logic
 * Usage example)
 *   const initialValues = {email:'', password:''}
 *   const { values, handleChange, handleSubmit } = useForm(initialValues, login);
 */
const useForm = (initialValues, callback) => {
  const [values, setValues] = useState(initialValues)

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    callback()
  }

  const handleChange = (event) => {
    event.persist()
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  }

  return {
    handleChange,
    handleSubmit,
    values
  }
}

export default useForm
