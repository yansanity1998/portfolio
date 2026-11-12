import type { ExperienceEntry } from '../types'
import pixzelLogo from '../assets/logos/pixzel.jpg'
import spcLogo from '../assets/logos/spc.png'

export const experiences: ExperienceEntry[] = [
  {
    period: 'August 10, 2026 - Present',
    title: 'Junior Developer',
    company: 'Pixzel Digital Service',
    description:
      'Promoted to Junior Developer after successfully completing OJT and part-time tenure at Pixzel Digital Service. Taking full ownership of client projects, developing core features, and building scalable web applications with modern tech stacks.',
    logo: pixzelLogo,
  },
  {
    period: 'May 18, 2026',
    title: 'Part-Time Developer',
    company: 'Pixzel Digital Service',
    description:
      'Continuing as a part-time developer at Pixzel Digital Service after completing OJT, taking on more client projects and maintenance work while balancing academic responsibilities.',
    logo: pixzelLogo,
  },
  {
    period: 'January 29, 2026',
    title: 'OJT',
    company: 'Pixzel Digital Service',
    description:
      'Working hands-on with real-world clients at Pixzel Digital Service, building and maintaining websites while learning industry workflows, team collaboration, and modern development practices under professional mentorship.',
    logo: pixzelLogo,
  },
  {
    period: '2023 - 2025',
    title: 'Project Development',
    company: 'School Projects',
    description:
      'Developed multiple academic projects ranging from web applications to database-driven systems, exploring React, Laravel, and Firebase while sharpening problem-solving skills through iterative design and team-based development.',
    logo: spcLogo,
  },
  {
    period: '2022',
    title: 'Hello World!',
    company: 'The Beginning',
    description:
      'Took my first steps into programming by learning the fundamentals of Java, HTML, CSS, and JavaScript. Built simple console apps and static websites that sparked a lasting passion for software development.',
    logo: spcLogo,
  },
]

