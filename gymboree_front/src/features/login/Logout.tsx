import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { logoutAsync } from './loginSlice'

const Logout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // Dispatch the logoutAsync action to log the user out
        dispatch(logoutAsync(localStorage.getItem('refresh')))
        // Clear local storage and navigate to the home page
        localStorage.clear()
        navigate("/")
    }, [])

    return (
        <div>Logout</div>
    )
}
export default Logout