import { useEffect, useState } from "react";

type OptionType = { label: string; value: string };

interface MultiSelectorProps {
  rawOptions: string[] | OptionType[];
  isOptionObject?: boolean;
  isTotalDefault?: boolean;
  value?: string;
  onSelectOption: (selected: string) => void;
}

export const MultiSelector = ({
  rawOptions,
  isOptionObject = false,
  isTotalDefault = false,
  value,
  onSelectOption,
}: MultiSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>(value ?? "");

  useEffect(() => {
    let formatted: OptionType[] = [];
    if (isOptionObject) {
      formatted = (rawOptions as OptionType[]).map((opt) => ({
        label: opt.label,
        value: opt.value,
      }));
    } else {
      formatted = (rawOptions as string[]).map((v) => ({ label: v, value: v }));
    }
    // 전체 옵션 추가
    const withTotal = [{ label: "전체", value: "" }, ...formatted];
    setOptions(withTotal);
    // 선택값은 부모에서 제어
  }, [rawOptions, isOptionObject, isTotalDefault]);

  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    onSelectOption(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[200px]">
      <button
        onClick={toggleOpen}
        className="w-full border border-gray-300 px-4 py-2 rounded-md text-left bg-white shadow-sm hover:border-gray-400 transition text-gray-900"
      >
        {options.find((o) => o.value === selectedValue)?.label || "전체"}
      </button>

      {isOpen && (
        <div className="absolute w-full border border-gray-300 bg-white max-h-52 overflow-y-auto z-50 p-3 mt-2 rounded-md shadow-md">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="block text-sm mt-1 cursor-pointer flex items-center text-gray-900 hover:text-blue-600"
              onClick={() => handleSelect(opt.value)}
            >
              <input
                type="radio"
                className="mr-2"
                checked={selectedValue === opt.value}
                readOnly
              />
              <span className="text-gray-900">{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
