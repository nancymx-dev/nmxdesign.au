import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AiLabEntry } from '../types';

function TitleWithItalicSuffix({ title, suffix }: { title: string; suffix: string }) {
  const index = title.lastIndexOf(suffix);
  if (index === -1) return <>{title}</>;
  const head = title.slice(0, index);
  const tail = title.slice(index);
  return (
    <>
      {head}
      <span className="italic text-[rgba(24,64,39,0.95)]">{tail}</span>
    </>
  );
}

function CollageBentoFallback() {
  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-[rgba(24,64,39,0.12)] bg-[rgba(255,145,98,0.32)]">
      <div className="absolute inset-0 p-6">
        <div className="grid h-full grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[rgba(24,64,39,0.12)] bg-white/65" />
          <div className="rounded-2xl border border-[rgba(24,64,39,0.12)] bg-white/55" />
          <div className="rounded-2xl border border-[rgba(24,64,39,0.12)] bg-white/55" />
          <div className="rounded-2xl border border-[rgba(24,64,39,0.12)] bg-white/65" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-6 hidden w-40 -rotate-2 rounded-xl border border-[rgba(24,64,39,0.14)] bg-[rgba(255,145,98,0.68)] p-4 shadow-[0_14px_30px_rgba(24,64,39,0.1)] lg:block">
        <div className="font-pfMarletItalic italic text-sm leading-tight text-[rgba(118,41,0,0.95)]">
          “Models are getting
          <br />
          eerily good at
          <br />
          spatial reasoning.”
        </div>
      </div>
    </div>
  );
}

const VIDEO_SRC = '/AIlabs/endtoendexperiment/heroeverything.MOV';
const POSTER_SRC = '/AIlabs/endtoendexperiment/homepageOPEN.png';

export default function EndToEndExperimentBentoCard({
  entry,
  className,
  visible,
}: {
  entry: AiLabEntry;
  className?: string;
  visible: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  const stop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  }, []);

  const start = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch {
      // ignore autoplay block; users can still click the card and read the entry
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      setHovered(false);
      stop();
      return;
    }
    if (!videoOk) return;
    if (hovered) start();
    else stop();
  }, [hovered, start, stop, visible, videoOk]);

  return (
    <article
      className={`group md:col-span-8 overflow-hidden rounded-3xl border border-gray-200 bg-white/75 shadow-[0_16px_40px_rgba(24,64,39,0.06)] transition-shadow hover:shadow-[0_24px_60px_rgba(24,64,39,0.08)] ${className ?? ''}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      aria-hidden={!visible}
    >
      <div className="grid h-full grid-cols-1 md:grid-cols-2">
        <div className="p-8 sm:p-10">
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[rgba(24,64,39,0.12)] bg-[rgba(190,235,199,0.22)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.85)]">
              Experiment
            </span>
            <span className="rounded-full border border-[rgba(24,64,39,0.12)] bg-[rgba(234,225,216,0.9)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(24,64,39,0.68)]">
              AI workflow
            </span>
          </div>

          <h2 className="font-pfMarlet text-5xl font-medium leading-[0.95] tracking-[-0.03em] text-[var(--brand-green)] sm:text-6xl">
            <TitleWithItalicSuffix title={entry.title} suffix="with AI" />
          </h2>

          {entry.summary ? (
            <p className="mt-6 text-base leading-relaxed text-[rgba(24,64,39,0.72)]">
              {entry.summary}
            </p>
          ) : null}

          <div className="mt-6">
            {entry.link.kind === 'internal' && visible ? (
              <Link
                to={entry.link.to}
                className="group inline-flex items-center gap-2 font-bold text-[var(--brand-orange)] transition-all hover:gap-4"
              >
                Read the notes <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative min-h-[16rem] bg-[rgba(234,225,216,0.55)] p-6">
          <div className="relative h-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-18px_rgba(24,64,39,0.18)]">
            {!videoOk ? (
              <div className="absolute inset-0">
                <CollageBentoFallback />
              </div>
            ) : null}

            {videoOk ? (
              <img
                src={POSTER_SRC}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-0' : 'opacity-100'}`}
                style={{ objectPosition: '50% 18%' }}
              />
            ) : null}

            {videoOk ? (
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="auto"
                className={`h-full w-full object-cover transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
                style={{ objectPosition: '50% 45%' }}
                onError={() => setVideoOk(false)}
              >
                <source src={VIDEO_SRC} />
              </video>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
