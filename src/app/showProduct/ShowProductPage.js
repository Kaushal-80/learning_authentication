"use client";

import UserContext from '@/context/userContext'
import axios from 'axios';
import { NextResponse } from 'next/server';
import React, { useContext, useEffect, useState } from 'react'

const ShowProductPage = () => {

    const [productData, setProductData] = useState([])

    const context = useContext(UserContext);

    async function loadProduct(user_id) {
        try {
            const response = await axios.get(`/api/product/${user_id}/productDetail`);
            const result = await response.data;
            setProductData([...result])
        } catch (error) {
            return NextResponse.json({ message: "error in fetching products" })
        }

    }

    useEffect(() => {
        if (context.user) {
            loadProduct(context.user._id);
        }
    }, [context.user])

    return (
        <>
            <div>Products({productData.length})</div>
            {productData.map((product) => {
                return ( 
                        <div key={product._id} className='bg-slate-600 w-xl my-3'>
                            <h1 className='font-bold text-lg text-white'>{product.product}</h1>
                            <p className='font-normal text-sm text-white'> {product.description}</p>
                        </div>
                    
                )

            })}
        </>
    )
}

export default ShowProductPage