import { fireEvent, render, screen } from '@testing-library/react';
import ProjectModal from './ProjectModal';
import { projects } from '../../data';
import { translations } from '../../constants/translations';

test('carousel remains navigable and resets when changing projects', () => {
  const originalScrollTo = HTMLElement.prototype.scrollTo;
  HTMLElement.prototype.scrollTo = jest.fn();
  const { container, unmount } = render(
    <ProjectModal projects={projects} initialIndex={0} onClose={() => {}}
      theme="light" tModal={translations.en.projects.modal} />
  );
  try {
    for (const index of [1, 2, 3, 0]) {
      fireEvent.click(screen.getByRole('button', { name: `Show screenshot ${index + 1}` }));
      expect(container.querySelectorAll('.carousel-dot')[index].getAttribute('aria-current')).toBe('true');
      fireEvent.transitionEnd(container.querySelector('.carousel-track'), { propertyName: 'transform' });
    }
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }));
    expect(screen.getByRole('heading', { name: 'Food Swap' })).toBeTruthy();
    expect(container.querySelector('.carousel-dot').getAttribute('aria-current')).toBe('true');
  } finally {
    unmount();
    HTMLElement.prototype.scrollTo = originalScrollTo;
  }
});
