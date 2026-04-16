// components/Button.jsx

const Button = ({
  children,
  type = "button",
  onClick,
  loading = false,
  variant = "primary"
}) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition duration-200";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`${baseStyle} ${variants[variant]} ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;