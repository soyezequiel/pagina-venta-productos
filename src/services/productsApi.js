const PRIMARY = import.meta.env.VITE_API_URL_PRIMARY
//const FALLBACK = import.meta.env.VITE_API_URL1
const FALLBACK2 = import.meta.env.VITE_API_URL_FALLBACK2
const mapperPrimary = (p) =>  ({ id:p.id, name:p.title, price:p.price, imageUrl:pickImage(p), description:p.description  });
//const mapperFallback = (p) => ({ id:p.id, name:p.title, price:p.price, imageUrl:p.image, description:p.description  });
const mapperFallback2 = (p) => ({ id:p._id, name:p.title, price:p.price.current, imageUrl:pickImage(p), description:p.description  });

//const endPointFallback = "/products"
const endPoint = "/products"
const endPointFallback2 = "/shop/products/all"


// async function hasMoreProducts(endpoint, signal){
    
// }






async function fetchProductFrom(base, endpoint, mapper,signal){
    const res = await fetch(`${base}${endpoint}`,{signal});
    if(!res.ok) throw new Error("Error al cargar los productos");
    const raw = await res.json();
    const list = Array.isArray(raw) ? raw : raw.products
    if (!Array.isArray(list)) throw new Error("Formato de datos no reconocido"  )
    return list.map((p) => mapper(p))
}

// export async function getProducts(page="1",pageSize="8",signal){
//     const endpointMod = `${endPoint}?offset=${(page-1)*pageSize}&limit=${pageSize}`;
//     try {
//         return await fetchProductFrom(PRIMARY,endpointMod,mapperPrimary,signal);
//     } catch (error) {
//         const endPointFallback2Mod =  `${endPointFallback2}?page_index=${page}&page_size=${pageSize}`;
//         console.warn("Primary API failed, usando fallback", error.message);
//         return await fetchProductFrom(FALLBACK2, endPointFallback2Mod, mapperFallback2,signal);
//     }
// }

export async function getProductsPage(page="1",pageSize="8",signal){
    const endpointMod = `${endPoint}?offset=${(page-1)*pageSize}&limit=${pageSize}`;
    try {
        return await fetchProductFrom(PRIMARY,endpointMod,mapperPrimary,signal);
    } catch (error) {
        const endPointFallback2Mod =  `${endPointFallback2}?page_index=${page}&page_size=${pageSize}`;
        console.warn("Primary API failed, usando fallback", error.message);
        return await fetchProductFrom(FALLBACK2, endPointFallback2Mod, mapperFallback2,signal);
    }
}

const BLOCKED_HOSTNAMES = ["alta.ge", "placeimg.com"];
function isAllowedImageUrl(url){
    if(!url || typeof url !== "string") return false;
    try {
        const u = new URL(url)
        return ["http:","https:"].includes(u.protocol) && !BLOCKED_HOSTNAMES.includes(u.hostname);
    } catch {
        return false;
    }
}
const PLACEHOLDER = "https://placehold.co/600x400?text=Sin+imagen"
function pickImage(product){
    const candidates = [product?.thumbnail, ...(product?.images || [])];
    return candidates.find(isAllowedImageUrl) || PLACEHOLDER
}

