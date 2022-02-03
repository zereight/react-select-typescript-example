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
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isRequired: boolean;
  delayMs: number;
  callback: (inputValue: string) => void;
  singleInput: SingleInput | null;
  multiInput: MultiInput | null;
}

const DebouncedSelector = ({
  title,
  isClearable = false,
  isDisabled = false,
  placeholder,
  delayMs,
  isRequired,
  callback,
  singleInput,
  multiInput,
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
