import { useEffect, useRef, useState } from "react";

type OptionType = { label: string; value: string };

interface MultiSelectorProps {
  rawOptions: string[] | OptionType[];
  isOptionObject?: boolean;
  isTotalDefault?: boolean;
  onSelectOptions: (selected: string[]) => void;
}

export const MultiSelector = ({
  rawOptions,
  isOptionObject = false,
  isTotalDefault = false,
  onSelectOptions,
}: MultiSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const totalSelected = useRef(0);

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
    totalSelected.current = formatted.length;
    setOptions(formatted);

    if (isTotalDefault) {
      const all = formatted.map((o) => o.value);
      setSelectedValues(all);
      onSelectOptions(all);
    } else {
      setSelectedValues([]);
      onSelectOptions([]);
    }
  }, [rawOptions, isOptionObject, isTotalDefault]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleCheck = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(next);
    onSelectOptions(next);
  };

  const handleSelectAll = () => {
    if (selectedValues.length === totalSelected.current) {
      setSelectedValues([]);
      onSelectOptions([]);
    } else {
      const all = options.map((o) => o.value);
      setSelectedValues(all);
      onSelectOptions(all);
    }
  };

  return (
    <div className="relative w-[300px]">
      <button
        onClick={toggleOpen}
        className="w-full border border-gray-300 px-4 py-2 rounded-md text-left bg-white shadow-sm hover:border-gray-400 transition"
      >
        {selectedValues.length === 0
          ? "선택"
          : `선택됨 (${selectedValues.length})`}
      </button>

      {isOpen && (
        <div className="absolute w-full border border-gray-300 bg-white max-h-52 overflow-y-auto z-50 p-3 mt-2 rounded-md shadow-md">
          <label className="block text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedValues.length === totalSelected.current}
              onChange={handleSelectAll}
            />
            전체
          </label>
          <hr className="my-2" />
          {options.map((opt) => (
            <label
              key={opt.value}
              className="block text-sm mt-1 cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedValues.includes(opt.value)}
                onChange={() => handleCheck(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
