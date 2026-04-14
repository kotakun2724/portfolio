export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  role: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  featured?: boolean;
  isGame?: boolean;
  image?: string;
};

export const projects: Project[] = [
  {
    slug: 'mugendungeon',
    name: 'MUGENDUNGEON',
    summary:
      '見下ろし視点の3Dローグライク・ダンジョン探索アクションゲーム。自動生成ダンジョンを探索し、鍵を集めてゴールを目指す。',
    role: 'ゲーム開発者',
    stack: ['Unity', 'C#', 'URP', 'ProBuilder'],
    highlights: [
      '無限に変化する自動生成ダンジョン',
      'スタミナ管理と近接アクション戦闘',
      'ショップシステムとアイテム管理',
      'スキルツリーによるキャラクター育成',
      'NPCとの出会いと物語',
    ],
    links: [{ label: 'Steam', href: 'https://store.steampowered.com/app/4580570/MUGENDUNGEON/?l=japanese' }],
    featured: true,
    isGame: true,
    image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4580570/7eba3d646450ed29a07b665cda3608fc732cd33f/ss_7eba3d646450ed29a07b665cda3608fc732cd33f.1920x1080.jpg?t=1775780634',
  },
  {
    slug: 'vulkan-renderer',
    name: 'Vulkan Renderer (MoltenVK)',
    summary:
      'A learning-focused rendering project using Vulkan API (MoltenVK on macOS). Progresses from triangle rendering to animated triangles and quads.',
    role: 'Solo Developer',
    stack: ['C++', 'Vulkan', 'GLFW', 'GLSL', 'CMake', 'MoltenVK'],
    highlights: [
      'Vulkan pipeline setup from scratch',
      'Triangle and quad rendering (2-triangle approach)',
      'Animated geometry with per-frame updates',
      'Cross-platform via MoltenVK on macOS',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Vulkan' }],
    featured: true,
  },
  {
    slug: 'dungeongen',
    name: 'DungeonGen (Procedural Dungeon Prototype)',
    summary:
      'A Unity prototype exploring procedural generation, interactive gimmicks, and dungeon lighting.',
    role: 'Gameplay / Systems Developer',
    stack: ['Unity', 'C#', 'URP', 'Git'],
    highlights: [
      'Procedural generation experiments (noise / rules-based layouts)',
      'Gameplay gimmicks (physics, triggers, modular interactions)',
      'Lighting & atmosphere tuning for dungeons',
      'Performance-minded iteration (profiling + refactors)',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/DungeonGen' }],
    featured: true,
  },
  {
    slug: 'darts-journey-frontend',
    name: 'ぶっ飛びダーツの旅 (Web Frontend)',
    summary:
      'React/TypeScript frontend for a hackathon game: receives a random destination (lat/lon) from a backend and displays navigation UI.',
    role: 'Frontend Developer',
    stack: ['React', 'TypeScript', 'HTML', 'CSS'],
    highlights: [
      'API-driven UI (destination + route payloads)',
      'Clear screen flow (start → destination → navigation)',
      'Responsive layout and component-based structure',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724' }],
    featured: true,
  },
  {
    slug: 'sfml-retro-games',
    name: 'SFML Retro Games (Pac-Man / Tetris)',
    summary:
      'Small C++/SFML games to practice core loops, collisions, rendering, and input handling.',
    role: 'Solo Developer',
    stack: ['C++', 'SFML'],
    highlights: [
      'Game loop + time-step handling',
      'Collision detection and simple AI behaviors',
      'Rendering pipeline basics (sprites, text, UI)',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724' }],
  },
  {
    slug: 'dicegame-git-workflow',
    name: 'DiceGame (Git Workflow Practice)',
    summary:
      'A small project used to practice branching, pull requests, and collaboration with GitHub.',
    role: 'Developer',
    stack: ['Unity', 'C#', 'GitHub'],
    highlights: [
      'Branching strategies for feature work',
      'Code review and merge conflict handling',
      'Keeping a Unity repo healthy with Git LFS',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/DiceGame' }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
