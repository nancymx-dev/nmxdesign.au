interface BackLinkProps {
  to?: string;
  label?: string;
  className?: string;
}

export default function BackLink({
  to = '/case-studies',
  label = 'Back to Case Studies',
  className,
}: BackLinkProps) {
  return (
    <a href={to} className={`text-[#184027] font-bold text-lg ${className ?? ''}`}>
      <button className="group inline-flex items-center gap-2 bg-transparent relative py-2 px-4">
        <img
          src="/Aboutme/Arrowright.svg"
          alt="Go back"
          aria-hidden="true"
          className="w-5 h-5 rotate-180 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
        />
        {label}
      </button>
    </a>
  );
}
