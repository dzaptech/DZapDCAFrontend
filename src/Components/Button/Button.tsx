import { LoadingOutlined } from '@ant-design/icons';

declare const ButtonHTMLTypes: ['submit', 'button', 'reset'];
export declare type ButtonHTMLType = typeof ButtonHTMLTypes[number];

function Button({
  onClick,
  disabled,
  children,
  loading,
  className,
  isSubmit,
}: {
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  isSubmit?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled || loading}
      className={className}
    >
      {loading && <LoadingOutlined className="text-white mr-1" spin />}
      {children}
    </button>
  );
}
Button.defaultProps = {
  disabled: false,
  loading: false,
  className: '',
  isSubmit: false,
  onClick: null,
};
export default Button;
