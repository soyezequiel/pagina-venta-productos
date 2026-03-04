import ProductCard from "../ui/ProductCard";
export default function ProductGridSection() {
  return(
        <section>
            <h2 className="text-3xl font-bold tracking-wide mb-10 flex justify-start">Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {ProductsData.map((item) => (
                    <ProductCard key={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl} />
                ))}

            </div>
            
        </section>
        )
}

const ProductsData=[
    {id:1,imageUrl:"https://picsum.photos/400/600?6", name:"Producto 1", price: 19.99},
    {id:2,imageUrl:"https://picsum.photos/400/600?7", name:"Producto 2", price: 29.99},
    {id:3,imageUrl:"https://picsum.photos/400/600?8", name:"Producto 3", price: 39.99},
    {id:4,imageUrl:"https://picsum.photos/400/600?9", name:"Producto 4", price: 49.99},
    {id:5,imageUrl:"https://picsum.photos/400/600?10", name:"Producto 5", price: 59.99},
    {id:6,imageUrl:"https://picsum.photos/400/600?11", name:"Producto 6", price: 69.99}
];