import React from 'react';
interface ButtonProps {
  label?: string;
  type?: 'submit' | 'reset' | 'button';
  color?: 'primary' | 'secondary' | 'success' | 'transparent';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: (event: React.FormEvent) => void;
}

export const Button = ({
  onClick,
  color = 'transparent',
  label,
  icon: IconComponent,
  disabled = false,
  loading = false,
  type = 'button',
  ...props
}: ButtonProps): JSX.Element => {
  const className = `button button--${color} ${disabled || loading ? 'button--disabled' : ''}`;
  return (
    <button
      className={className}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="spinner-border"></span>}
      {IconComponent && <IconComponent className="button-icon" />}
      {label}
    </button>
  );
};
