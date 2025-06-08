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
    <div style={{ width: "300px", position: "relative" }}>
      <button onClick={toggleOpen} style={{ width: "100%" }}>
        {selectedValues.length === 0
          ? "Select options"
          : `Selected (${selectedValues.length})`}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            border: "1px solid #ccc",
            background: "#fff",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 100,
            padding: "0.5rem",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={selectedValues.length === totalSelected.current}
              onChange={handleSelectAll}
            />
            Select All
          </label>
          <hr />
          {options.map((opt) => (
            <label
              key={opt.value}
              style={{ display: "block", marginTop: "4px" }}
            >
              <input
                type="checkbox"
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
