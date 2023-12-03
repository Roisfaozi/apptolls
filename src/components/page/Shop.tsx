import { getProduct } from '@/utils/api/products';
import ModalAddProduct from '../UI/ModalAddProduct';
import ProductCard from '../UI/ProductCard';

interface Image {
  _id: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  license_id: string[];
  image_id: Image[];
}
interface ApiResponse {
  products: Product[];
}

export const revalidate = 3600

async function Product() {
  const { products }: ApiResponse = await getProduct()


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

      {/* Page header */}
      <div className="mb-5">

        {/* Title */}
        <div className='flex flex-row justify-between'>
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-4">Find the right product for you ✨</h1>
          <ModalAddProduct />
        </div>

        <div className="mb-4 border-b border-slate-200"></div>

        <div>
          <div className="mt-8">
            <div className="grid grid-cols-12 gap-6">
              {products.map((product: Product) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product