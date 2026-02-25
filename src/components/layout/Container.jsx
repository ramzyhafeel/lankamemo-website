export default function Container({ className = "", children }) {
  return <div className={`container-max ${className}`}>{children}</div>;
}