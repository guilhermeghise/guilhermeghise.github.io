import { render, screen, fireEvent } from '@testing-library/react';
import Projects from './Projects';
import { projects } from '../../data';
import { translations } from '../../constants/translations';

test('shows each app overview and opens the matching project in both languages', () => {
  for (const lang of ['en', 'pt']) {
    const t = translations[lang].projects;
    const onOpenProject = jest.fn();
    const { unmount } = render(
      <Projects t={t} projects={projects.map(p => ({ ...p, ...t.items[p.slug] }))}
        onOpenProject={onOpenProject} />
    );

    projects.forEach((project, index) => {
      expect(screen.getByText(t.items[project.slug].summary)).toBeTruthy();
      fireEvent.click(screen.getByRole('button', {
        name: `${t.openProject}: ${project.title}`,
      }));
      expect(onOpenProject).toHaveBeenLastCalledWith(index);
    });
    expect(onOpenProject).toHaveBeenCalledTimes(projects.length);
    unmount();
  }
});
