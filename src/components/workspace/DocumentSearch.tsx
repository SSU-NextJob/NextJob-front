import { Input, Box } from "@chakra-ui/react";
import { Search } from "lucide-react";

interface DocumentSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function DocumentSearch({ 
  value, 
  onChange, 
  onSearch,
  placeholder = "문서 검색..." 
}: DocumentSearchProps) {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(value);
    }
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
          onKeyDown={handleKeyDown}
        />
      </Box>
    </form>
  );
}