import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Homepage from './Homepage';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: async () => ({
        days: [{ count: 61, date: '2026-06-25', level: 4 }],
        daysToKeep: 180,
        generatedAt: '2026-06-25T12:45:44.982Z',
        profileUrl: 'https://github.com/nancymx-dev',
        totalContributions: 61,
        username: 'nancymx-dev',
        yearContributions: 79,
      }),
      ok: true,
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('Homepage', () => {
  it('renders the recruiter-facing hero copy and employer logos', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(
        /I design products for complicated environments: enterprise platforms, internal tools, and AI-assisted workflows\./,
      ),
    ).toBeTruthy();
    expect(screen.getByText('Worked at')).toBeTruthy();
    expect(screen.getByAltText('Atlassian logo')).toBeTruthy();
    expect(screen.getByAltText('ReadyTech logo')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Jump to bottom of page' }).getAttribute('href')).toBe(
      '#page-bottom',
    );
    expect(document.getElementById('page-bottom')).toBeTruthy();
  });

  it('renders the GitHub contribution section with working contact links', async () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Design & Build' })).toBeTruthy();
    expect(await screen.findByText('61 contributions in the last 180 days')).toBeTruthy();
    expect(
      screen
        .getByRole('link', { name: /Compose email to nmxdesignau@gmail.com/ })
        .getAttribute('href'),
    ).toBe('mailto:nmxdesignau@gmail.com');
    expect(
      screen.getByRole('link', { name: "Open Nancy Gao's LinkedIn profile" }).getAttribute('href'),
    ).toBe('https://www.linkedin.com/in/nancymxgao/');
    expect(screen.getByRole('link', { name: "Open Nancy Gao's GitHub" }).getAttribute('href')).toBe(
      'https://github.com/nancymx-dev',
    );
    expect(
      screen.getByRole('link', { name: "Open Nancy Gao's X profile" }).getAttribute('href'),
    ).toBe('https://x.com/nmxdesign');
  });

  it('no longer renders the trait cards below the fold', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>,
    );

    expect(screen.queryByRole('heading', { name: 'Creative' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Experimenter' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Can-doer' })).toBeNull();
  });
});
