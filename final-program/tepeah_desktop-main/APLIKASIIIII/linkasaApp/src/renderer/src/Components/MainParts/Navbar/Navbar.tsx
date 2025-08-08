import Logo from '../../../../assets/LinKasaLogo.png'
import logoutIcon from '../../../../assets/LogoutIcon.png'
import {onAuthStateChanged} from 'firebase/auth'
import { User } from 'firebase/auth'
import { useEffect,  useState, useContext} from "react";
import {auth} from '../../../Controller/FirebaseConfig/firebaseConfig'
import {getEmployeeInformation, signOutAction} from "../../../Controller/PageControllers/LoginControllers";
import {UserContext} from "../../Context/UserContext";
import NavbarChild from './NavbarChild';
import { getPassengerInformation } from "../../../Controller/GeneralControls/PassengerController";
import PassengerNavbarChild from "./PassengerNavbarChild";
import {notifEmployee} from '@renderer/Controller/GeneralControls/EmployeeController';

function Navbar ()  {
    const [user, setUser] = useState<User | null>(null);

    const userContext = useContext(UserContext);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if(user?.email) {
                setUser(user)
                const isEmployeeEmail = user.email.split('@')[1].includes('lk.com')
                if(isEmployeeEmail) {
                    getEmployeeInformation(user.email).then((employee) => {
                        userContext?.updateData(employee)
                        if(employee) notifEmployee(employee.companyEmail)
                    })
                }
                else {
                    getPassengerInformation(user.email).then((result) => {
                        userContext?.updatePassenger(result)
                    })
                }
            }
            else {

            }
        })
    }, [user])

    const signOutClicked = () => {
        signOutAction();
    }
  return <div>
    <div className="m-0 p-6 flex items-center justify-between">
    <div className="m-0 p-0">
      <a href="/home">
        <img src={Logo} alt="" className="w-1/3"/>
      </a>
    </div>
    {(userContext?.currentUser || userContext?.passenger) ? (<div className="flex items-center gap-4 text-lg no-underline text-black tracking-wide justify-center">
        {userContext?.currentUser ? (
            <div className={'flex items-center gap-3'}>
                <a href={'/schedule'} className={'text-sm text-black font-bold hover:underline'}>Schedule</a>
                <div>
                    <NavbarChild></NavbarChild>
                </div>
                <div>
                    <p className="text-lg font-bold">Hi, {userContext.currentUser.name}</p>
                </div>
                <div>
                    <img onClick={signOutClicked} src={logoutIcon} alt="" className="w-8 opacity-60 hover:opacity-100" />
                </div>
            </div>
        ) : (<></>)}
        {userContext?.passenger ? (
            <div>
                <div className={'flex items-center gap-3'}>
                    <div className={'flex gap-3]'}>
                        <PassengerNavbarChild></PassengerNavbarChild>
                    </div>
                    <div>
                        <p> {userContext?.passenger.email} </p>
                    </div>
                    <div> <img onClick={signOutClicked} src={logoutIcon} alt="" className="w-8 opacity-60 hover:opacity-100" /> </div>
                </div>
            </div>
        ) : (
            <div>
            </div>
        )}
    </div>) : (<>
        {(!userContext?.passenger && !userContext?.currentUser) ? (
            <div>
                <a href="/login" className="no-underline">
                    <p className="text-black font-bold no-underline text-xl px-3">Log in</p>
                </a>
            </div >
        ) : (
            <></>
        )}

    </>)}

  </div>
  </div>
}

export default Navbar
