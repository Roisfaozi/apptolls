
interface InputProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

function Input({ label, id, type, placeholder, required }: InputProps) {
  return (
    <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={id}>
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input id={id} type={type} className="form-input w-full text-gray-800" placeholder={placeholder} required={required} />
      </div>
    </div>
  );
}

export default Input;
