import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import MODCCaseStudyPage from './MODCCaseStudyPage';
import { modcSlides } from './modcCards';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('MODCCaseStudyPage', () => {
  it('renders the hero intro section with title and summary', () => {
    render(
      <MemoryRouter>
        <MODCCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('modc-page')).toBeInTheDocument();
    expect(screen.getByText('Multi-org domain claim')).toBeInTheDocument();
    expect(screen.getByText(/Designed an enterprise admin experience/i)).toBeInTheDocument();
    expect(screen.getByText(/User experience designer/)).toBeInTheDocument();
  });

  it('renders scope metadata cards', () => {
    render(
      <MemoryRouter>
        <MODCCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Scope')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Delivery')).toBeInTheDocument();
    expect(screen.getByText('Enterprise admin experience in Atlassian Admin')).toBeInTheDocument();
  });

  it('renders all slide cards', () => {
    render(
      <MemoryRouter>
        <MODCCaseStudyPage />
      </MemoryRouter>,
    );

    modcSlides.forEach((slide) => {
      expect(screen.getByTestId(`slide-card-${slide.id}`)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId(/^slide-card-/)).toHaveLength(modcSlides.length);
  });

  it('renders the progress indicator', () => {
    render(
      <MemoryRouter>
        <MODCCaseStudyPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('sticky-progress')).toBeInTheDocument();
  });
});
