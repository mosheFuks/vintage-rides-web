interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`mb-10 flex flex-col gap-3 lg:mb-14 ${alignClass}`}>
      {eyebrow && (
        <span className="text-sm font-medium tracking-[0.2em] text-acento uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl tracking-wide text-texto uppercase lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-texto-secundario">{description}</p>
      )}
    </div>
  );
}
