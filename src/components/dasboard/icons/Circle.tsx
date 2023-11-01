export default function CircleIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" {...props}>
      <circle className="text-sky-200" cx="15" cy="15" r="9" fillRule="nonzero" />
      <circle className="text-sky-400" cx="9" cy="9" r="9" />
    </svg>
  );
}
