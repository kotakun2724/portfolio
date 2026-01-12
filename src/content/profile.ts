export type SocialLinks = {
  github?: string;
  linkedin?: string;
  x?: string;
  website?: string;
  email?: string;
};

export type Profile = {
  name: string;
  initials: string;
  title: string;
  location: string;
  summary: string;
  bio: string[];
  highlights: string[];
  skills: {
    primary: string[];
    tools: string[];
  };
  links: SocialLinks;
};

export const profile: Profile = {
  name: 'Kota Ito',
  initials: 'KI',
  title: 'Game Developer / CS Student',
  location: 'Japan',
  summary:
    'Computer Science & Engineering student building games and tools with Unity and Unreal Engine. Interested in graphics, procedural generation, and game AI. Competitive programmer (AtCoder ~1200).',
  bio: [
    'I build gameplay systems and prototypes in Unity (C#) and Unreal Engine 5, focusing on solid architecture and performance.',
    'I enjoy graphics and simulation work (OpenGL/SFML), and I like turning algorithms into interactive demos.',
    'Outside development, I’m active in tech communities and enjoy giving short talks and sharing what I learn.',
  ],
  highlights: [
    'AtCoder rating ~1200 (light-blue)',
    'Unity + Unreal Engine 5 prototyping',
    'Procedural generation & lighting',
    'Graphics / low-level fundamentals (C++ / OpenGL / SFML)',
    'Talks & community activities (LTs / hackathons)',
  ],
  skills: {
    primary: [
      'C++',
      'C#',
      'TypeScript',
      'Unity',
      'Unreal Engine 5',
      'OpenGL',
      'SFML',
      'React',
    ],
    tools: ['Visual Studio', 'Visual Studio Code', 'Git', 'GitHub', 'Git LFS'],
  },
  links: {
    github: 'https://github.com/kotakun2724',
    linkedin: 'https://www.linkedin.com/in/%E8%88%AA%E5%A4%A7-%E4%BC%8A%E8%97%A4-a32968358/',
    x: 'https://x.com/kotakun2724',
    email: 'itokota3t@gmail.com',
  },
};
