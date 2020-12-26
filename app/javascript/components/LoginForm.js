import React from 'react'

export default function LoginForm({ user_field, onChange, onSubmit}) {
  return (
    <div>
      <form>
        <input name="user_field" type="text" value={user_field} onChange={onChange} />
        <button onClick={onSubmit} type="submit" >LogIn</button>
      </form>
    </div>
  )
}
