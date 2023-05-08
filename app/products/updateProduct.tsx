'use client'


type Product = {
    id: number,
    title: string,
    price: number,
}


import { useRouter } from "next/navigation"
import { useState, SyntheticEvent } from "react"


export default function UpdateProducts(product: Product) {
  
const [ modal, setModal ] = useState(false)
const [ price, setPrice ] = useState(product.price)
const [ title, setTitle ] = useState(product.title)
const [ isMute, setIsMute ] = useState(false)

 function handleChange(){
    setModal(!modal);
}  
  

const router = useRouter();

const handleUpdate = async (e: SyntheticEvent)=> {
    e.preventDefault()
    setIsMute(true)
    await fetch(`http://localhost:5000/products/${product.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            price: price,
        })
    });
    setIsMute(false)
    router.refresh();
    setModal(false);
}

  return (

<div>   
    <button className="btn btn-primary btn-sm mx-2" onClick={handleChange}>Edit</button>
    <input type='checkbox' checked={modal} onChange={handleChange} className="modal-toggle"/>
    <div className="modal">
        <div className="modal-box">
            <div className="font-bold text-lg">Edit Product</div>
            <form onSubmit={handleUpdate}>
                <div className="form-control">
                    <div className="label font-bold">Title</div>
                    <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    className="input w-full input-bordered" 
                    placeholder="Product Name" />
                </div>
                <div className="form-control">
                    <div className="label font-bold">Price</div>
                    <input 
                    value={price}
                    onChange={(e)=>setPrice(Number(e.target.value))}
                    type="text" 
                    className="input w-full input-bordered" 
                    placeholder="Price" />
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isMute ? (
                        <button type="submit" className="btn btn-primary">update</button>                       
                    ) : (
                        <button type="button" className="btn loading">updated...</button>
                    )
                }
                </div>
            </form>
        </div>
    </div>
</div>
  )
}
