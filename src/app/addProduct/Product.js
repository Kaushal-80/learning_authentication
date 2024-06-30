"use client"

import axios from 'axios'
import { NextResponse } from 'next/server'
import React, { useState } from 'react'

const Product = () => {

    const [productData, setProductData] = useState({
        product: "",
        description: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/product", productData);
            // console.log(response);
            if(response.status === 200){
                setProductData({
                    product: "",
                    description: "",
                })
            }
            return NextResponse.json({message:"product created successfully"})
        } catch (error) {
            console.log(error);
            return NextResponse.json({message:"error in adding product"})
        }
    }

    return (
        <>
            <div className="mx-auto mt-5 max-w-md border-2 border-slate-200 p-5 rounded-md">
                <div className='mb-5 border-b border-slate-500 pb-2'>
                    <h1 className='text-lg font-bold'>Add Product </h1>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Add Product</label>
                        <input type="text" id="example2" className="block w-full rounded-md px-5 py-2 border border-slate-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" placeholder="mobile"
                        onChange={(e) => {setProductData({
                            ...productData,
                            product: e.target.value,
                        })}}
                        value ={productData.product}
                        />
                    </div>
                    <div>
                        <label  className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                        <textarea type="textarea" id="example3" className="block w-full rounded-md px-5 py-2 border border-slate-200  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500" 
                        onChange={(e) => {setProductData({
                            ...productData,
                            description: e.target.value,
                        })}}
                        value ={productData.description}
                        />
                    </div>
                    <button type="submit" className="rounded-lg border border-slate-200  bg-blue-400 hover:bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white  disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300">Submit</button>
                </form>
                {/* {JSON.stringify(productData)} */}
            </div>

        </>
    )
}

export default Product