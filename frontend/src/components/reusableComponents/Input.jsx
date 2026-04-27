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
      <div className="flex flex-col gap-1.5 mb-5 group">
        {label && (
          <label className="text-sm font-medium text-slate-400 group-focus-within:text-indigo-400 transition-colors duration-200 ml-1">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            placeholder={placeholder}
            {...register(name, rules)}
            className={`w-full bg-slate-900/50 border-2 px-4 py-3 rounded-xl outline-none transition-all duration-200 text-slate-100 placeholder:text-slate-600
              ${errors[name] 
                ? "border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10" 
                : "border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"}
            `}
          />
        </div>

        {errors[name] && (
          <span className="text-rose-400 text-xs font-medium ml-1 animate-fade-in">
            {errors[name]?.message}
          </span>
        )}
      </div> 
    </>
  )
}

export default Input
