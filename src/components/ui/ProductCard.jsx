export default function ProductCard({imageUrl}) {
    return(
        <div className="bg-gray-100 p-6 rounded">
            <img src={imageUrl} alt="Producto" className="w-full  object-cover"/>
            <div className="border flex justify-center mt-2 ">
                <button className="w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white transition hover:scale-110 transition">
                    +
                </button>
            </div>
        </div>
    )
}