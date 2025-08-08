import React, { useState, useEffect, useContext } from 'react'

type User = {
  name: string
  position: string
}

type UserContext = {
  user: User | null
  setUser: (User) => void
}

export const AuthContext = React.createContext<UserContext>({
  user: null,
  setUser: () => {}
})

export function useAuth() {
  useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)

  const value = {
    user: authUser,
    setUser: setAuthUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
