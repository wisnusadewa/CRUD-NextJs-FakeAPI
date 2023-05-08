import AddProducts from "./addProducts"
import DeleteProducts from "./deleteProducts"
import UpdateProducts from "./updateProduct"



export const metadata = {
    title: 'CRUD',
    description: 'Generated by create next app',
  }

type Product = {
    id: number,
    title: string,
    price: number,
}


const getData = async () => {
    const res = await fetch("http://localhost:5000/products", {cache:'no-store'})
    return res.json()
}


export default async function ProductList() {
    const products: Product[] = await getData();
  
    return (
    <div className="px-10 py-10">
        <div className="py-2">
            <AddProducts />
        </div>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
            products.map((product, index) => (           
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td className="flex">
                    <DeleteProducts {...product}/>
                    <UpdateProducts {...product}/>
                    </td>
                </tr>
            ))
            }
            </tbody>       
        </table>






       
    </div>
  )
}
