type Props = {
  isOn: boolean;
  toggle: () => void;
};

export function ToggleSwitch({ isOn, toggle }: Props) {
  const switchClass = isOn ? 'toggle-switch is-on' : 'toggle-switch';
  return (
    <div className={switchClass} onClick={toggle}>
      <div className="slider">
        <div className="switch"></div>
      </div>
      <span className="state-label">{isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}

export default ToggleSwitch;
