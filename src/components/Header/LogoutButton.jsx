import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authSlice'

function LogoutButton() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button className='inline-block px-6 py-2 border-2 text-[18px] text-red-500 border-transparent font-bold rounded-full duration-150 hover:bg-red-500 hover:border-red-600 cursor-pointer hover:text-white'
            onClick={logoutHandler}>
            Logout
        </button >
    )
}

export default LogoutButton