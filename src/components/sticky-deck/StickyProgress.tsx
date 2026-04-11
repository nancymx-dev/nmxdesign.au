interface StickyProgressProps {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  visible: boolean;
}

const StickyProgress = ({ total, activeIndex, onSelect, visible }: StickyProgressProps) => {
  return (
    <nav
      data-testid="sticky-progress"
      aria-label="Slide navigation"
      className={`fixed right-6 top-1/2 z-50 -translate-y-1/2 flex-col items-center gap-2.5 transition-opacity duration-300 motion-reduce:transition-none ${
        visible ? 'hidden lg:flex' : 'hidden'
      }`}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === activeIndex ? 'step' : undefined}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all duration-300 motion-reduce:transition-none ${
            i === activeIndex
              ? 'h-5 w-2.5 bg-[var(--brand-purple)]'
              : 'h-2.5 w-2.5 bg-[rgba(24,64,39,0.18)] hover:bg-[rgba(24,64,39,0.35)]'
          }`}
        />
      ))}
    </nav>
  );
};

export default StickyProgress;
