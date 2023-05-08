'use client'


import { useRouter } from "next/navigation"
import { useState, SyntheticEvent } from "react"


export default function AddProducts() {
  
const [ modal, setModal ] = useState(false)
const [ price, setPrice ] = useState('')
const [ title, setTitle ] = useState('')
const [ isMute, setIsMute ] = useState(false)

 function handleChange(){
    setModal(!modal);
}  
  

const router = useRouter();

const handleSubmit = async (e: SyntheticEvent)=> {
    e.preventDefault()
    setIsMute(true)
    await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            price: price,
        })
    });
    setIsMute(false)
    // setTitle('');
    // setPrice('');
    router.refresh();
    setModal(false);
}

  return (

<div>   
    <button className="btn btn-primary" onClick={handleChange}>Add New</button>
    <input type='checkbox' checked={modal} onChange={handleChange} className="modal-toggle"/>
    <div className="modal">
        <div className="modal-box">
            <div className="font-bold text-lg">Add Product</div>
            <form onSubmit={handleSubmit}>
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
                    onChange={(e)=>setPrice(e.target.value)}
                    type="text" 
                    className="input w-full input-bordered" 
                    placeholder="Price" />
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isMute ? (
                        <button type="submit" className="btn btn-primary">Save</button>                       
                    ) : (
                        <button type="button" className="btn loading">saving....</button>
                    )
                }
                </div>
            </form>
        </div>
    </div>
</div>
  )
}
