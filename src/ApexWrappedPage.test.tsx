import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ApexWrappedPage from './ApexWrappedPage';
import { apexSlides } from './data/apexWrappedCards';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('ApexWrappedPage', () => {
  it('renders the hero intro section with title and summary', () => {
    render(
      <MemoryRouter>
        <ApexWrappedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('apex-wrapped-page')).toBeInTheDocument();
    expect(screen.getByText('Apex Wrapped')).toBeInTheDocument();
    expect(
      screen.getByText(/Created Atlassian's first AI-powered performance review tool/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Driver, Owner & Product designer/)).toBeInTheDocument();
  });

  it('renders scope metadata cards', () => {
    render(
      <MemoryRouter>
        <ApexWrappedPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Scope')).toBeInTheDocument();
    expect(screen.getByText('Scale')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Delivery')).toBeInTheDocument();
    expect(screen.getByText('10,000+ employees')).toBeInTheDocument();
  });

  it('renders all slide cards', () => {
    render(
      <MemoryRouter>
        <ApexWrappedPage />
      </MemoryRouter>,
    );

    apexSlides.forEach((slide) => {
      expect(screen.getByTestId(`slide-card-${slide.id}`)).toBeInTheDocument();
    });
    expect(screen.getAllByTestId(/^slide-card-/)).toHaveLength(apexSlides.length);
  });

  it('renders the progress indicator', () => {
    render(
      <MemoryRouter>
        <ApexWrappedPage />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('sticky-progress')).toBeInTheDocument();
  });
});
