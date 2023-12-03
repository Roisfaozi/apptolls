'use client'
import { useState } from 'react';
import ModalBasic from '../parts/Modalbasic';

function ModalAddProduct() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [files, setFiles] = useState<File | null>();

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (!files) return
    try {
      const data = new FormData()
      data.append('imageUrl', files)
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('price', formData.price)
      const res = await fetch('/api/product', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      console.error(e)
    }
    setFormData({
      name: '',
      description: '',
      price: '',
    })
    setFiles(null)
    setProductModalOpen(false);
  };

  return (
    <div className="m-1.5">
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        aria-controls="feedback-modalAddProduct"
        onClick={(e) => {
          e.stopPropagation();
          setProductModalOpen(true);
        }}
      >
        Add Product
      </button>
      <ModalBasic
        id="feedback-modal"
        modalOpen={productModalOpen}
        setModalOpen={setProductModalOpen}
        title="Add Product"
      >
        <div className="px-5 py-4">
          <div className="text-sm">
            <div className="font-medium text-slate-800 mb-3">
              Let us know what you think 🙌
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="name"
              >
                name <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input w-full px-2 py-1"
                type="text"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea w-full px-2 py-1"
                rows={4}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price <span className="text-rose-500">*</span>
              </label>
              <input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input w-full px-2 py-1"
                type="text"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="image">
                Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                id="image"
                name="image"
                onChange={(e) => setFiles(e.target.files?.[0])}
                className="form-input w-full px-2 py-1"
                type="file"
                required
              />
            </div>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={(e) => {
                e.stopPropagation();
                setProductModalOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </div>
      </ModalBasic>
    </div>
  );
}

export default ModalAddProduct;
