'use client'


import { useRouter } from "next/navigation"
import { useState } from "react"

type Product = {
    id: number,
    title: string,
    price: number,
}

export default function DeleteProducts(product: Product) {
  
const [ modal, setModal ] = useState(false)
const [ isMute, setIsMute ] = useState(false)

function handleChange(){
    setModal(!modal);
}  
  

const router = useRouter();

const handleDelete = async (productId : number)=> {
    setIsMute(true)
    await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
    });
    setIsMute(false)
    router.refresh();
    setModal(false);
}

  return (

<div>   
    <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
    <input type='checkbox' checked={modal} onChange={handleChange} className="modal-toggle"/>
    <div className="modal">
        <div className="modal-box">
            <div className="font-bold text-lg">Are you sure for delete {product.title}</div>
            
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isMute ? (
                        <button type="button" onClick={()=> handleDelete(product.id)} className="btn btn-primary">Delete</button>                       
                    ) : (
                        <button type="button" className="btn loading">Deleting...</button>
                    )
                }
                </div>
           
        </div>
    </div>
</div>
  )
}
