export default function AiLabBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.34] mix-blend-multiply"
      style={{
        backgroundImage: "url('/AIlabs/dots.svg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '24px 24px',
      }}
    />
  );
}
