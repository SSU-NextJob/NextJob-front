interface BadgeProps {
  type: string;
}

export const Badge = ({ type }: BadgeProps) => {
  let className = "";

  switch (type) {
    case "해커톤":
      className = "bg-blue-600 text-white";
      break;
    case "공모전":
      className = "bg-red-500 text-white";
      break;
    case "사이드 프로젝트":
      className = "bg-gray-300 text-gray-800";
      break;
    default:
      className = "bg-gray-200 text-gray-700";
  }

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {type}
    </span>
  );
};
