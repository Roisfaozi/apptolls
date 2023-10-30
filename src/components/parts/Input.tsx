
interface InputProps {
  label: string;
  id: string;
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, id, type, placeholder, required, value, onChange, name }: InputProps) {
  // const handleChange = () => {
  //   onChange()
  // }
  return (
    <div className="flex flex-wrap -mx-3 mb-2 mt-2">
      <div className="w-full px-3">
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor={id}>
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <input id={id} type={type} className="form-input w-full text-gray-800" placeholder={placeholder} required={required} value={value} onChange={onChange} name={name} />
      </div>
    </div>
  );
}

export default Input;
