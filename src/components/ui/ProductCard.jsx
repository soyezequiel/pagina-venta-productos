export default function ProductCard({ imageUrl, name, price }) {
  return (
    <div>
      <div className="relative border bg-gray-100 p-6">
        <img src={imageUrl} alt={name} className="w-full object-cover" />
        <button
          type="button"
          className="absolute bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 border bg-white flex items-center justify-center"
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
