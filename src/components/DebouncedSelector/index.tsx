import { useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import * as S from "./styles";

interface SingleInput {
  defaultValue: string;
  onChange: (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
}

interface MultiInput {
  defaultValue: string[];
  onChange: (
    newValue: MultiValue<{
      label: string;
      value: string;
    }>
  ) => void;
}

interface Props {
  title: string;
  data: string[];
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isRequired: boolean;
  delayMs?: number;
  singleInput?: SingleInput;
  multiInput?: MultiInput;
  amountShowItem?: number;
}

const DebouncedSelector = ({
  data,
  title,
  isClearable = false,
  isDisabled = false,
  placeholder = "",
  delayMs = 1000,
  isRequired,
  singleInput,
  multiInput,
  amountShowItem = 100,
  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeId, setTimeId] = useState<NodeJS.Timeout | null>(null);

  const filterValues = (inputValue: string) => {
    const options = data.map(_data => {
      return {
        label: _data,
        value: _data
      };
    });

    return options
      .filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, amountShowItem)
      .sort((prev, next) => prev.label.length - next.label.length);
  };

  const getAsyncOptions = (inputValue: string) =>
    new Promise(resolve => {
      if (timeId) {
        clearTimeout(timeId);
      }

      const newTimeId = setTimeout(() => {
        setIsLoading(true);
        resolve(filterValues(inputValue));
        setIsLoading(false);
      }, delayMs);

      setTimeId(newTimeId);
    });

  return (
    <S.Frame {...props}>
      <S.Label isRequired={isRequired}>{title}</S.Label>
      {singleInput && (
        <AsyncSelect
          loadOptions={getAsyncOptions}
          onChange={singleInput.onChange}
          defaultOptions
          value={{
            label: singleInput.defaultValue,
            value: singleInput.defaultValue
          }}
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
      )}
      {multiInput && (
        <AsyncSelect
          loadOptions={getAsyncOptions}
          onChange={multiInput.onChange}
          defaultOptions
          isMulti={true}
          value={multiInput.defaultValue.map(value => {
            return {
              label: value,
              value
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
      )}
    </S.Frame>
  );
};

export default DebouncedSelector;
