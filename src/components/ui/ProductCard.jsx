import eyeIcon from "../../assets/icons/eye.svg";
export default function ProductCard({ imageUrl, name, price }) {
  return (
    <div>
      <div className="relative  bg-gray-100 p-6">
       {/* <div className="absolute top-2 left-2 h-8 w-8 flex items-center justify-center"> */}
            <button className="absolute top-2 left-2 z-10 h-8 w-8 p-0 bg-white rounded-full flex items-center justify-center"><img src={eyeIcon} alt="Ver producto" className="absolute h-6 w-6 block " /></button>
    
       {/* </div> */}
        <img src={imageUrl} alt={name} className="w-full object-cover" />
        <button
          type="button"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 h-8 w-8  bg-white flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="mt-4 flex w-full justify-between">
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </div>
  );
}
