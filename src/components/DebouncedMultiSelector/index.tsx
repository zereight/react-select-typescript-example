import { useState } from "react";
import { MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import * as S from "./styles";

interface Props {
  title: string;
  defaultValue: string[];
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  isRequired: boolean;
  delayMs: number;
  callback: (inputValue: string) => void;
  onChange: (
    newValue: MultiValue<{
      label: string;
      value: string;
    }>
  ) => void;
}

const DebouncedMultiSelector = ({
  defaultValue,
  title,
  isClearable = false,
  isDisabled = false,
  isMulti = false,
  placeholder,
  delayMs,
  isRequired,
  onChange,
  callback,

  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeId, setTimeId] = useState<NodeJS.Timeout | null>(null);

  const getAsyncOptions = (inputValue: string) =>
    new Promise(resolve => {
      if (timeId) {
        clearTimeout(timeId);
      }

      const newTimeId = setTimeout(() => {
        setIsLoading(true);
        resolve(callback(inputValue));
        setIsLoading(false);
      }, delayMs);

      setTimeId(newTimeId);
    });

  return (
    <S.Frame {...props}>
      <S.Label isRequired={isRequired}>{title}</S.Label>
      <AsyncSelect
        loadOptions={getAsyncOptions}
        onChange={onChange}
        isMulti={true}
        defaultOptions
        value={defaultValue.map(_option => {
          return {
            label: _option,
            value: _option
          };
        })}
        cacheOptions={true}
        isLoading={isLoading}
        styles={{
          control: base => ({
            ...base,
            borderColor: "#eaeaea",
            boxShadow: "none",
            "&:hover": {
              borderColor: "#0070F3"
            }
          })
        }}
      />
    </S.Frame>
  );
};

export default DebouncedMultiSelector;
