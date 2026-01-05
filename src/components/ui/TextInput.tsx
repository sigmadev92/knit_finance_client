import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import CustomButton from "./CustomButton";
type Variant = "regular";
const TextInput = ({
  placeholder,
  inputType,
  icon,
  label,
  handleChange,
  name,
  value,
  style,
  variant,
  readOnly,
  min,
  max,
  required,
}: {
  placeholder: string;
  inputType: string;
  icon?: React.ReactElement;
  label: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  gap?: number;
  style?: {
    label?: string;
    input?: string;
    size?: string;
  };
  readOnly?: boolean;
  min?: number;
  max?: number;
  variant?: Variant;
  required?: boolean;
}) => {
  const regular = "relative flex flex-col gap-2 w-full";
  const [it, setIt] = useState<boolean>(inputType === "password");
  const maping = {
    regular,
    _: "",
  };
  return (
    <div className={`${maping[variant || "_"]} ${style?.size || ""}`}>
      <label htmlFor={name} className={style?.label || "text-xl"}>
        {" "}
        {label}
      </label>
      <div className="absolute top-2 right-3">{icon}</div>
      <div className="relative">
        <input
          type={
            inputType === "password" ? (it ? "password" : "text") : inputType
          }
          placeholder={placeholder}
          name={name}
          readOnly={readOnly}
          id={name}
          minLength={min}
          maxLength={max}
          value={value}
          required={required}
          className={`border-light input-custom w-full ${style?.input}`}
          onChange={(e) => handleChange(e)}
        />

        {inputType === "password" && (
          <CustomButton
            className="absolute right-2 top-[50%] translate-y-[-50%]"
            variant="rounded-0"
            onClick={() => setIt((prev) => !prev)}
          >
            {it ? <EyeIcon size={16} /> : <EyeOffIcon size={16} />}
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default TextInput;
