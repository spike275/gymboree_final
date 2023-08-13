import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { redirect, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { selectUser } from '../login/loginSlice'
import { addProdAsync } from './productSlice'

/**
 * Component for managing store products in the admin panel.
 */
const Admin = () => {
    const currentUser: string = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [name, setname] = useState("")
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState("second")
    const [img, setimg] = useState(null)
    const [category, setcategory] = useState("")

    /**
     * Handle image selection for the product.
     * 
     * @param {Event} event - The input change event containing selected image.
     */
    const handleImg = (event: any) => {
        setimg(event.target.files[0])
    }

    /**
     * Send a new product to be added asynchronously to the store.
     */
    const sendProduct = () => {
        console.log('first')
        dispatch(addProdAsync({ name, price, "description":desc, "image":img, category  }))
    }

    return (
        <div> 
            Admin - store managment
            <hr />
            add products:
            <br />
            product name:<input onChange={(e) => setname(e.target.value)} /><br />
            product price: <input type="number" onChange={(e) => setprice(e.target.valueAsNumber)} /><br />
            product description: <input onChange={(e) => setdesc(e.target.value)} /><br />
            product category: <input onChange={(e) => setcategory(e.target.value)} /><br />
            image: <input type="file" accept="image/png,image/jpeg" onChange={handleImg} />
            <button onClick={sendProduct}>upload</button>
        </div>
    )
}

export default Admin