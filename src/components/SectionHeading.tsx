import { motion } from 'framer-motion';

// Consistent section heading voice: handwritten eyebrow + display headline.
export default function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  light = false,
  as: Tag = 'h2',
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: 'center' | 'left';
  light?: boolean;
  as?: 'h1' | 'h2';
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <motion.div
      className={`flex flex-col ${alignCls}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={`eyebrow ${light ? 'text-butter' : ''}`}>{eyebrow}</span>
      <Tag
        className={`font-display mt-1 max-w-2xl text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-cream' : 'text-chocolate'
        }`}
      >
        {title}
      </Tag>
      {sub && (
        <p className={`mt-3 max-w-xl text-[0.95rem] leading-relaxed ${light ? 'text-cream/70' : 'text-cocoa/70'}`}>
          {sub}
        </p>
      )}
      <div className="dotline mt-5 w-24" />
    </motion.div>
  );
}
