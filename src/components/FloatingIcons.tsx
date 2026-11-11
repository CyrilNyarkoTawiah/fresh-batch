// Faint hand-drawn bakery icons that drift slowly in the page background.
// Pure SVG line art — no image assets, tiny footprint. Decorative only.
const ICONS: { path: string; cls: string; delay: string }[] = [
  // wheat sprig
  {
    path: 'M12 30c0-8 3-14 3-14s3 6 3 14c0 5-3 8-3 8s-3-3-3-8zm3-14v22',
    cls: 'left-[6%] top-[24%] h-14 w-14',
    delay: '0s',
  },
  // whisk
  {
    path: 'M6 28L18 14m-9 17c-4-4-3-10 2-12 4-1.6 8 .8 8 5 0 4-4 7-10 7zm13-14c2-2 4-3 6-2',
    cls: 'right-[8%] top-[16%] h-16 w-16',
    delay: '1.2s',
  },
  // rolling pin
  {
    path: 'M4 22h28m-4-6v12M8 16v12M4 22c-1.5 0-2.5-1-2.5-2.5S3 17 4 17m28 0c1.5 0 2.5 1 2.5 2.5S33.5 22 32 22',
    cls: 'left-[12%] bottom-[18%] h-16 w-16',
    delay: '2.1s',
  },
  // croissant
  {
    path: 'M6 26c-2-6 2-14 8-16 4-1.4 9 0 12 4 4 5 4 12 0 16-6 3-16 1-20-4zm6-13c-3 3-4 8-3 12m10-13c-2 4-2 10 0 14',
    cls: 'right-[10%] bottom-[24%] h-16 w-16',
    delay: '0.6s',
  },
  // cupcake
  {
    path: 'M10 18h16l-2 12H12l-2-12zm8-12c4 0 6 2.6 6 5.6 0 2.4-2.6 4.4-6 4.4s-6-2-6-4.4C12 8.6 14 6 18 6z',
    cls: 'left-[42%] top-[8%] h-12 w-12',
    delay: '1.7s',
  },
  // pretzel-ish dough swirl
  {
    path: 'M8 24c0-8 6-14 10-14s10 6 10 14c0 5-4 8-10 8S8 29 8 24zm4 0c0-5 3-8 6-8s6 3 6 8-2 6-6 6',
    cls: 'right-[38%] bottom-[10%] h-12 w-12',
    delay: '2.6s',
  },
];

export default function FloatingIcons() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {ICONS.map((icon, i) => (
        <svg
          key={i}
          viewBox="0 0 36 36"
          fill="none"
          stroke="#593C31"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`floaty-slow absolute opacity-[0.08] hidden md:block ${icon.cls}`}
          style={{ animationDelay: icon.delay }}
        >
          <path d={icon.path} />
        </svg>
      ))}
    </div>
  );
}
