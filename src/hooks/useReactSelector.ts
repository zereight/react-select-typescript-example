import { useState } from "react";
import { SingleValue } from "react-select";

const useReactSelectInput = (defaultValue: string) => {
  const [input, setInput] = useState(defaultValue);

  const onChangeInput = (
    option: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    setInput(option?.value || "");
  };

  return {
    input,
    setInput,
    onChangeInput
  };
};

export default useReactSelectInput;
