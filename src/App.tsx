import DebouncedSelector from "./components/DebouncedSelector";
import COLLEGE_LIST from "./constants/data";
import useReactSelectInput from "./hooks/useReactSelector";

const App = () => {
  const { input, onChangeInput } = useReactSelectInput("");

  return (
    <div>
      <DebouncedSelector
        data={COLLEGE_LIST}
        title="대학교"
        isRequired
        isClearable
        singleInput={{
          defaultValue: input,
          onChange: onChangeInput
        }}
      />
    </div>
  );
};

export default App;
