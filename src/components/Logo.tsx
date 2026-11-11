interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  compact?: boolean;
}

// Typographic wordmark with a wheat-sprig emblem. Scales down to favicon size.
export default function Logo({ variant = 'dark', className = '', compact = false }: LogoProps) {
  const ink = variant === 'dark' ? '#35251F' : '#FFF8EF';
  const gold = variant === 'dark' ? '#E9C26A' : '#F3D58A';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className={compact ? 'h-7 w-7' : 'h-9 w-9'} aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill={ink} />
        <path d="M20 9c-2.4 3.8-4 7-4 10 0 2.4 1.6 4 4 5.6 2.4-1.6 4-3.2 4-5.6 0-3-1.6-6.2-4-10z" fill={gold} />
        <path d="M20 15.5c-1.6 2.4-2.4 4.6-2.4 6.6 0 1.6.8 2.8 2.4 4 1.6-1.2 2.4-2.4 2.4-4 0-2-.8-4.2-2.4-6.6z" fill={ink} />
        <path d="M14 29c2 3 3.9 4.6 6 5.4 2.1-.8 4-2.4 6-5.4-2.4.6-4.3 1-6 1s-3.6-.4-6-1z" fill="#E9B6AE" />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display text-[1.05rem] font-extrabold tracking-[0.14em]"
            style={{ color: ink }}
          >
            FRESH
          </span>
          <span
            className="font-display text-[1.05rem] font-medium italic tracking-[0.28em]"
            style={{ color: gold }}
          >
            BATCH
          </span>
        </span>
      )}
    </span>
  );
}
