import { cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

beforeEach(() => {
  window.scrollTo = vi.fn();

  Object.defineProperty(window.SVGElement.prototype, 'getTotalLength', {
    configurable: true,
    value: vi.fn(() => 100),
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const renderRoute = (initialEntry: string) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <div>Homepage outlet</div> },
          { path: 'case-studies', element: <div>Case studies outlet</div> },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
  );

  return render(<RouterProvider router={router} />);
};

describe('App shell', () => {
  it('keeps the grid background mounted and makes the homepage outlet transparent', () => {
    const { container } = renderRoute('/');

    expect(container.querySelector('.grid-background')).toBeInTheDocument();
    expect(screen.getByText('Homepage outlet').parentElement).toHaveClass('bg-transparent');
  });

  it('keeps non-home route wrappers transparent so the shell background shows through', () => {
    renderRoute('/case-studies');

    expect(screen.getByText('Case studies outlet').parentElement).toHaveClass('bg-transparent');
  });

  it('renders Case Studies in the navigation', () => {
    renderRoute('/');

    const caseStudyLink = screen.getByRole('link', { name: 'Case Studies' });
    expect(caseStudyLink).toBeInTheDocument();

    const aiLabLink = screen.getByRole('link', { name: 'AI Lab' });
    expect(aiLabLink).toBeInTheDocument();
  });
});
