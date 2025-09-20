import { Input, Box } from "@chakra-ui/react";
import { Search } from "lucide-react";

interface DocumentSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DocumentSearch({ 
  value, 
  onChange, 
  placeholder = "문서 검색..." 
}: DocumentSearchProps) {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <Box className="relative mb-6">
        <Box className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
          <Search size={16} />
        </Box>
        <Input
          className="pl-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </form>
  );
}