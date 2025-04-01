import { FaCheck, FaTimes } from 'react-icons/fa';

type Props = {
  isValid: boolean;
};

export function Foo({ isValid }: Props) {
  if (isValid) {
    return <FaCheck color="green" />;
  } else {
    return <FaTimes color="red" />;
  }
}
