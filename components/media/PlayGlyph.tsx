type PlayGlyphProps = {
  className?: string;
};

export function PlayGlyph({ className = "play-glyph" }: PlayGlyphProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M18 14v20l18-10-18-10z" fill="currentColor" />
    </svg>
  );
}
