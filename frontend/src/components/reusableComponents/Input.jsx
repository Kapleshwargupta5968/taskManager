import {useFormContext} from "react-hook-form"
const Input = ({
    label,
    type,
    name,
    placeholder,
    rules = {}
}) => {
    const {register, formState:{errors}} = useFormContext();
  return (
    <>
     <div className="flex flex-col gap-1 mb-4">
        {label && <label className="font-medium">{label}</label>}

        <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`border px-3 py-2 rounded-md outline-none ${errors[name] ? "border-red-500" : "border-gray-300"}`}
        />

        {errors[name] && (
            <span className="text-red-500 text-sm">{errors[name]?.message}</span>
        )}
        </div> 
    </>
  )
}

export default Input
