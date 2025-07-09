interface ButtonProps {
  children: string;
  disabled?: boolean;
  onClick?: (e: any) => void;
  color?: "gray" | "blue" | "red" | "green" | "black" | "white" | "none";
}

export const Button = ({
  children,
  disabled = false,
  onClick,
  color = "none",
}: ButtonProps) => {
  const base = "text-sm px-4 py-1.5 rounded-md font-semibold transition";

  const colorClass = {
    none: "focus:outline-none focus:ring-0 active:ring-0",
    gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    white: "text-gray-800 border hover:bg-gray-50",
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    black: "bg-black hover:bg-gray-800",
  };

  const disabledClass = {
    none: "focus:outline-none focus:ring-0 active:ring-0 cursor-not-allowed",
    gray: "bg-gray-100 text-white cursor-not-allowed",
    white: "text-gray-800 border cursor-not-allowed",
    blue: "bg-blue-300 text-white cursor-not-allowed",
    red: "bg-red-300 text-white cursor-not-allowed",
    green: "bg-green-300 text-white cursor-not-allowed",
    black: "bg-gray-400 text-white cursor-not-allowed",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${
        disabled ? disabledClass[color] : colorClass[color]
      }`}
    >
      {children}
    </button>
  );
};
