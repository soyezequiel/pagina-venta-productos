const BASE = import.meta.env.VITE_API_URL

export async function getProducts(signal){
    const res = await fetch(`${BASE}/products`,{signal})
    if(!res.ok) throw new Error("Error al cargar los productos")
        const raw = await res.json()

    return raw.map((p) => ({
        id:p.id,
        name:p.title,
        price:p.price,
        imageUrl:p.images[1],
        description:p.description
    }))
}


