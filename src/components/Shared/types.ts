import { Option } from '../Shared/Dropdown/SimpleDropdown/Dropdown';

export type FormValueType = string | boolean | Date | [Date, Date] | Option;
export interface FormItemChildProps {
  id?: string;
  name?: string;
  onChange?: (name: string, value: FormValueType) => void;
}
