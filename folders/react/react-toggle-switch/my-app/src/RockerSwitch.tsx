type ToggleSwitchProps = {
  isOn: boolean;
  toggle: () => void;
};

export function RockerSwitch({ isOn, toggle }: ToggleSwitchProps) {
  return (
    <div
      className={`light-switch ${isOn ? 'switch-on' : 'switch-off'}`}
      onClick={toggle}>
      <div className="switch-top"></div>
      <div className="switch-bottom"></div>
    </div>
  );
}

export default RockerSwitch;
