import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border flex border-ccc p-4 mx-20 m-2 w-5/6 rounded bg-white relative ">
      <div className="w-1/6 max-h-[160px] max-w-[160px]">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="w-5/6 relative px-4">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p className="max-h-[75px] overflow-hidden text-ellipsis">{product.description}</p>
        <div className="absolute bottom-0 right-0">
          <Link to={"/product/"+product.id}>
            <button className="px-4 py-1 text-white bg-blue-500 rounded">
                View Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
