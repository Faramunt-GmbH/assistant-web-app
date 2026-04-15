export type RoleType = 'system' | 'human';

const ROLE_LABELS: Record<RoleType, string> = {
  system: 'System',
  human: 'Human',
};

const ROLE_OPTIONS: RoleType[] = ['human', 'system'];

interface RoleSelectorProps {
  value: RoleType;
  onChange: (role: RoleType) => void;
  disabled?: boolean;
}

export default function RoleSelector({
  value,
  onChange,
  disabled,
}: RoleSelectorProps) {
  return (
    <select
      tabIndex={1}
      value={value}
      onChange={e => onChange(e.target.value as RoleType)}
      disabled={disabled}
      className="px-3 py-1"
    >
      {ROLE_OPTIONS.map(r => (
        <option key={r} value={r}>
          {ROLE_LABELS[r]}
        </option>
      ))}
    </select>
  );
}
