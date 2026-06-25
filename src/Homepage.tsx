import { animated, useTrail } from '@react-spring/web';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { FiExternalLink, FiMail } from 'react-icons/fi';

const GITHUB_URL = 'https://github.com/nancymx-dev';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nancymxgao/';
const X_URL = 'https://x.com/nmxdesign';
const EMAIL_ADDRESS = 'nmxdesignau@gmail.com';
const EMAIL_DRAFT_URL = `mailto:${EMAIL_ADDRESS}`;

const contributionColors = ['#F5EBDD', '#E6F0AE', '#B9DD5C', '#6AAE4D', '#0A6B49'];

type GithubContributionDay = {
  count: number;
  date: string;
  level: number;
};

type GithubContributionSnapshot = {
  days: GithubContributionDay[];
  daysToKeep: number;
  generatedAt: string;
  profileUrl: string;
  totalContributions: number;
  username: string;
  yearContributions: number;
};

type ContributionDay = GithubContributionDay & {
  day: number;
  label: string;
  week: number;
};

function getUtcDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  });
}

function prepareContributionDays(days: GithubContributionDay[]) {
  return days.map((day, index) => {
    const date = getUtcDate(day.date);

    return {
      ...day,
      day: date.getUTCDay(),
      label: formatDate(date),
      week: Math.floor(index / 7),
    };
  });
}

function getContributionMonthLabels(days: ContributionDay[], totalWeeks: number) {
  const seenMonths = new Set<string>();
  const labels: { column: number; label: string }[] = [];

  days.forEach((day) => {
    const date = getUtcDate(day.date);
    const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;

    if (seenMonths.has(monthKey)) {
      return;
    }

    const previousColumn = labels[labels.length - 1]?.column ?? 0;
    const minimumColumn = previousColumn === 0 ? day.week + 1 : previousColumn + 3;
    const column = Math.min(Math.max(day.week + 1, minimumColumn), totalWeeks);

    seenMonths.add(monthKey);
    labels.push({
      column,
      label: date.toLocaleDateString('en-AU', { month: 'short', timeZone: 'UTC' }),
    });
  });

  return labels;
}

function isContributionSnapshot(data: unknown): data is GithubContributionSnapshot {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const snapshot = data as GithubContributionSnapshot;

  return (
    Array.isArray(snapshot.days) &&
    typeof snapshot.daysToKeep === 'number' &&
    typeof snapshot.totalContributions === 'number' &&
    snapshot.days.every(
      (day) =>
        typeof day.date === 'string' &&
        typeof day.count === 'number' &&
        typeof day.level === 'number',
    )
  );
}

function ContactLink({
  children,
  href,
  icon,
  label,
  newTab = true,
}: {
  children: string;
  href: string;
  icon: ReactNode;
  label: string;
  newTab?: boolean;
}) {
  return (
    <a
      aria-label={label}
      className="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-[#28664F] transition-colors hover:text-[#AAAADD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAAADD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF6ED]"
      href={href}
      rel={newTab ? 'noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
    >
      <span className="text-lg" aria-hidden="true">
        {icon}
      </span>
      <span>{children}</span>
      {newTab && (
        <FiExternalLink
          aria-hidden="true"
          className="text-[#AAAADD] transition-colors group-hover:text-[#AAAADD]"
        />
      )}
    </a>
  );
}

function Homepage() {
  const [contributionSnapshot, setContributionSnapshot] =
    useState<GithubContributionSnapshot | null>(null);
  const [contributionLoadFailed, setContributionLoadFailed] = useState(false);
  const trail = useTrail(4, {
    from: { opacity: 0, transform: 'translateY(24px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { mass: 1, tension: 280, friction: 25 },
    delay: 180,
  });
  const contributionDays = useMemo(
    () => prepareContributionDays(contributionSnapshot?.days ?? []),
    [contributionSnapshot],
  );
  const totalWeeks = Math.max(1, Math.ceil(contributionDays.length / 7));
  const contributionMonthLabels = useMemo(
    () => getContributionMonthLabels(contributionDays, totalWeeks),
    [contributionDays, totalWeeks],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadContributionSnapshot() {
      try {
        const response = await fetch('/github-contributions.json', { cache: 'no-cache' });

        if (!response.ok) {
          throw new Error(`Could not load GitHub contribution data: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!isContributionSnapshot(data)) {
          throw new Error('GitHub contribution data has an unexpected shape.');
        }

        if (isMounted) {
          setContributionSnapshot(data);
          setContributionLoadFailed(false);
        }
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setContributionLoadFailed(true);
        }
      }
    }

    loadContributionSnapshot();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      <section className="relative px-4 pb-20 pt-4 sm:min-h-[calc(100dvh-var(--shell-nav-height,64px))] sm:px-24 sm:py-0 md:px-24 lg:px-24">
        <div className="mx-auto flex min-h-[calc(100dvh-var(--shell-nav-height,64px)-1.5rem)] max-w-7xl flex-col items-center justify-start sm:min-h-[calc(100dvh-var(--shell-nav-height,64px))] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col text-center sm:w-1/2 sm:justify-center sm:pr-8 sm:text-left">
            <animated.div style={trail[0]}>
              <div className="relative mx-auto inline-block w-fit sm:mx-0">
                <img
                  src="/Homepage/flower.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-10 top-1/2 z-10 w-10 -translate-y-1/2 select-none sm:-left-16 sm:w-16"
                />
                <img
                  src="/Homepage/pencil.png"
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 top-1/2 z-10 w-10 -translate-y-1/2 select-none sm:-right-16 sm:w-16"
                />

                <h1 className="relative z-0 font-lindsey text-[3.7rem] font-normal leading-none text-[#184027] sm:text-5xl lg:text-6xl">
                  Nancy Gao
                </h1>
              </div>
            </animated.div>

            <animated.div style={trail[1]}>
              <div className="mt-2 space-y-3 sm:mt-4 sm:space-y-5">
                <p
                  className="mx-auto max-w-[34rem] rounded-lg bg-[#FFF6ED]/60 text-[0.95rem] leading-[1.55] sm:mx-0 sm:text-base sm:leading-relaxed"
                  style={{ boxShadow: '0 0 30px 15px rgba(255, 246, 237, 0.6)' }}
                >
                  I design products for complicated environments: enterprise platforms, internal
                  tools, and AI-assisted workflows. My work helps teams move faster, make better
                  decisions, and reduce manual effort.
                </p>

                <div className="flex flex-col items-center gap-1.5 sm:items-start sm:gap-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#184027]/70">Worked at</p>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start sm:gap-6">
                    <img
                      src="/Homepage/Atlassianlogo.png"
                      alt="Atlassian logo"
                      className="h-10 w-28 object-contain"
                      loading="eager"
                    />
                    <img
                      src="/Homepage/Readytechlogo.png"
                      alt="ReadyTech logo"
                      className="h-10 w-28 object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </animated.div>
          </div>

          <div className="mt-4 flex w-full justify-center sm:mt-0 sm:w-1/2 sm:justify-end sm:pl-8">
            <animated.div
              style={trail[2]}
              className="w-full max-w-[19.5rem] sm:max-w-[27rem] lg:max-w-[32rem]"
            >
              <img
                className="h-auto max-w-full"
                src="/mainProfile.svg"
                alt="Portrait photo of Nancy next to a flower."
                loading="eager"
              />
            </animated.div>
          </div>
        </div>

        <a
          aria-label="Jump to bottom of page"
          className="group absolute bottom-1 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full text-[#AAAADD] transition hover:-translate-y-1 hover:text-[#8E8ED0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAAADD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF6ED] sm:bottom-2"
          href="#page-bottom"
        >
          <svg
            aria-hidden="true"
            className="h-14 w-14 overflow-visible drop-shadow-[0_8px_12px_rgba(170,170,221,0.18)]"
            fill="none"
            viewBox="0 0 64 64"
          >
            <path
              className="transition group-hover:translate-y-0.5"
              d="M31.5 8.5C30.2 18.9 29.8 31.5 31.7 45.2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              className="transition group-hover:translate-y-0.5"
              d="M19.2 34.6C23.9 39.7 28.1 44.3 32 52.1C35.5 45.3 39.8 39.8 45.5 35.4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              d="M28.5 9.8C30.8 8.7 33.1 8.2 35.6 8.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              opacity="0.55"
            />
          </svg>
        </a>
      </section>

      <section
        className="relative scroll-mt-20 px-4 pb-8 pt-24 text-[#184027] sm:px-16 sm:pb-10 sm:pt-44 lg:px-24 lg:pt-56"
        id="design-build"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-[-8%] bottom-0 h-32 rounded-t-[55%] bg-[#FFF1A8]"
        />

        <animated.div style={trail[3]} className="relative mx-auto max-w-7xl">
          <div className="rounded-[1.75rem] border border-[#184027]/10 bg-[#FFF6ED]/78 p-5 shadow-[0_18px_80px_rgba(24,64,39,0.08)] backdrop-blur-sm sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.4fr]">
              <div className="flex flex-col items-center lg:block">
                <div className="inline-flex items-end gap-2">
                  <h2 className="whitespace-nowrap font-lindsey text-[3.2rem] font-normal leading-none text-[#28664F] sm:text-[3.6rem] xl:text-[4.4rem]">
                    Design &amp; Build
                  </h2>
                  <img
                    src="/Homepage/pencil.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none mb-2 w-10 shrink-0 rotate-12 select-none sm:w-12 xl:mb-3 xl:w-14"
                  />
                </div>

                <a
                  className="mx-auto mt-6 flex w-fit items-center gap-3 rounded-full bg-[#FFF6ED] px-4 py-3 text-sm font-bold text-[#184027] shadow-[0_10px_28px_rgba(24,64,39,0.12)] transition hover:-translate-y-0.5 hover:text-[#28664F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AAAADD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF6ED] sm:mt-10 lg:mt-12"
                  href={GITHUB_URL}
                  rel="noreferrer"
                  target="_blank"
                >
                  <FaGithub aria-hidden="true" className="text-2xl text-[#2F3D4A]" />
                  <span>View my GitHub</span>
                  <FiExternalLink aria-hidden="true" className="text-[#AAAADD]" />
                </a>
              </div>

              <div className="min-w-0">
                {contributionDays.length > 0 ? (
                  <>
                    <div className="pb-1">
                      <div className="w-full" aria-label="GitHub contribution graph">
                        <div className="relative mb-2 ml-9 h-5 w-[calc(100%-2.25rem)] text-sm font-semibold leading-none text-[#28664F] sm:ml-12 sm:w-[calc(100%-3.25rem)]">
                          {contributionMonthLabels.map((month) => (
                            <span
                              className="absolute top-0 whitespace-nowrap"
                              key={month.label}
                              style={{
                                left: `${((month.column - 1) / totalWeeks) * 100}%`,
                              }}
                            >
                              {month.label}
                            </span>
                          ))}
                        </div>

                        <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-2 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-3">
                          <div className="grid grid-rows-7 text-xs font-semibold text-[#28664F] sm:text-sm">
                            <span className="row-start-2 self-center">Mon</span>
                            <span className="row-start-4 self-center">Wed</span>
                            <span className="row-start-6 self-center">Fri</span>
                          </div>

                          <div
                            className="grid w-full gap-0.5 sm:gap-1"
                            role="grid"
                            style={{
                              aspectRatio: `${totalWeeks} / 7`,
                              gridTemplateColumns: `repeat(${totalWeeks}, minmax(0, 1fr))`,
                              gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                            }}
                          >
                            {contributionDays.map((day) => (
                              <span
                                aria-label={`${day.count} ${
                                  day.count === 1 ? 'contribution' : 'contributions'
                                } on ${day.label}`}
                                className="rounded-[0.2rem] border border-[#FFF6ED]/80"
                                key={day.date}
                                role="gridcell"
                                style={{
                                  backgroundColor: contributionColors[day.level],
                                  gridColumn: day.week + 1,
                                  gridRow: day.day + 1,
                                }}
                                title={`${day.count} ${
                                  day.count === 1 ? 'contribution' : 'contributions'
                                } on ${day.label}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 text-sm font-semibold text-[#28664F] sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <span>Less</span>
                        <div className="flex items-center gap-1" aria-hidden="true">
                          {contributionColors.map((color) => (
                            <span
                              className="h-3.5 w-3.5 rounded-[0.18rem] border border-[#FFF6ED]/80"
                              key={color}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span>More</span>
                      </div>

                      <p>
                        {contributionSnapshot?.totalContributions ?? 0} contributions in the last{' '}
                        {contributionSnapshot?.daysToKeep ?? contributionDays.length} days
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-52 items-center justify-center rounded-2xl border border-dashed border-[#28664F]/25 bg-[#FFF6ED]/65 p-8 text-center text-sm font-semibold text-[#28664F]">
                    {contributionLoadFailed
                      ? 'GitHub contributions are temporarily unavailable.'
                      : 'Loading GitHub contributions...'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative mt-20 flex flex-col gap-5 sm:mt-24 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/Homepage/flower.png"
                alt=""
                aria-hidden="true"
                className="hidden h-14 w-14 rotate-[-12deg] object-contain sm:block"
              />
              <p className="font-lindsey text-3xl leading-none text-[#28664F] sm:text-4xl">
                Let's create meaningful
                <br />
                products together
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <ContactLink
                href={EMAIL_DRAFT_URL}
                icon={<FiMail />}
                label={`Compose email to ${EMAIL_ADDRESS}`}
              >
                {EMAIL_ADDRESS}
              </ContactLink>
              <ContactLink
                href={LINKEDIN_URL}
                icon={<FaLinkedinIn />}
                label="Open Nancy Gao's LinkedIn profile"
              >
                LinkedIn
              </ContactLink>
              <ContactLink href={GITHUB_URL} icon={<FaGithub />} label="Open Nancy Gao's GitHub">
                GitHub
              </ContactLink>
              <ContactLink href={X_URL} icon={<FaXTwitter />} label="Open Nancy Gao's X profile">
                X (Twitter)
              </ContactLink>
            </div>
          </div>
          <div id="page-bottom" className="h-px scroll-mt-20" />
        </animated.div>
      </section>
    </div>
  );
}

export default Homepage;
