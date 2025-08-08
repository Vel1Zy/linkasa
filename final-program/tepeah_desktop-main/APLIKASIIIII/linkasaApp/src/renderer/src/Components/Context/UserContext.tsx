import {
  UserContextInterface,
  UserContextProviderInterface
} from '../../Controller/Interfaces/ContextInterface'
import { createContext, useState } from 'react'
import { Employee } from '../../Controller/Interfaces/EmployeeInterface'
import { Passenger } from '../../Controller/Interfaces/PassengerInterface'

const UserContext = createContext<UserContextInterface | null>(null)

const UserProvider = ({ children }: UserContextProviderInterface) => {
  const [user, setUser] = useState<null | Employee>(null)
  const [passenger, setPassenger] = useState<Passenger | null>(null)

  const updateData = (currentUser: Employee | null) => {
    setUser(currentUser)
  }

  const updatePassenger = (currentPassenger: Passenger | null) => {
    setPassenger(currentPassenger)
  }

  const providerValue: UserContextInterface = {
    currentUser: user,
    passenger: passenger,
    updateData: updateData,
    updatePassenger: updatePassenger
  }

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
}

export { UserProvider, UserContext }
