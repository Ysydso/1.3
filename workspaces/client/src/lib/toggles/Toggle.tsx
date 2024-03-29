import { Conditional } from "@jcartledge/react-conditional";
import { useToggle } from "./useToggle";

type ToggleProps = React.PropsWithChildren<{
  name: string;
  isOff?: boolean;
}>;

export const Toggle: React.FC<ToggleProps> = ({
  children,
  name,
  isOff = false,
}) => (
  <Conditional predicate={useToggle(name) !== isOff}>{children}</Conditional>
);
