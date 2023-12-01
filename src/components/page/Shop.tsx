import ModalAddProduct from '../UI/ModalAddProduct'
import ProductCard from '../UI/ProductCard'

function Product() {
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
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product