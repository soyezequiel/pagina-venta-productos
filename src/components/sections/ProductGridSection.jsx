import ProductCard from "../ui/ProductCard";
export default function ProductGridSection() {
  return(
        <section>
            <h2 className="text-3xl font-bold tracking-wide mb-10">Productos Destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {ProductsData.map((item) => (
                    <ProductCard key={item.id} imageUrl={item.imageUrl} />
                ))}

            </div>
            
        </section>
        )
}

const ProductsData=[
    {id:1,imageUrl:"https://picsum.photos/400/600?6"},
    {id:2,imageUrl:"https://picsum.photos/400/600?7"},
    {id:3,imageUrl:"https://picsum.photos/400/600?8"},
    {id:4,imageUrl:"https://picsum.photos/400/600?9"},
    {id:5,imageUrl:"https://picsum.photos/400/600?10"},
    {id:6,imageUrl:"https://picsum.photos/400/600?11"}
];