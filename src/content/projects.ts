import type { Locale } from '../i18n';

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
  image?: string;
};

type ProjectCopy = {
  summary: string;
  role: string;
  highlights: string[];
};

const catalog: Array<
  Omit<Project, 'summary' | 'role' | 'highlights'> & { ja: ProjectCopy; en: ProjectCopy }
> = [
  {
    slug: 'mugendungeon',
    name: 'MUGENDUNGEON',
    stack: ['Unity', 'C#', 'URP', 'ProBuilder'],
    links: [{ label: 'Steam', href: 'https://store.steampowered.com/app/4580570/MUGENDUNGEON/' }],
    featured: true,
    image: '/images/mugendungeon.jpg',
    ja: {
      summary:
        '見下ろし視点の3Dローグライク・ダンジョン探索アクションゲーム。自動生成ダンジョンを探索し、鍵を集めてゴールを目指す。',
      role: 'ゲーム開発者',
      highlights: [
        '無限に変化する自動生成ダンジョン',
        'スタミナ管理と近接アクション戦闘',
        'ショップシステムとアイテム管理',
        'スキルツリーによるキャラクター育成',
        'NPCとの出会いと物語',
      ],
    },
    en: {
      summary:
        'A top-down 3D roguelike dungeon crawler. Explore generated floors, collect keys, and reach the goal.',
      role: 'Game Developer',
      highlights: [
        'Procedural dungeons that keep changing',
        'Stamina management and melee combat',
        'A shop and item inventory',
        'Character growth through a skill tree',
        'NPC encounters and a story',
      ],
    },
  },
  {
    slug: '1-44mb',
    name: '1.44 MB :: Sectors of the Lost Disk',
    stack: ['C', 'Raycasting', 'BSP', 'MinGW-w64'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/1.44MB' }],
    featured: true,
    image: '/images/lost-disk.png',
    ja: {
      summary:
        '1.44MBフロッピーディスク1枚に収まる、FPS視点のターンベース・ダンジョンクロウル。DDAレイキャスターで描画し、BSP分割による15フロアの手続き生成ダンジョンを探索する。',
      role: 'ゲーム開発者',
      highlights: [
        '実行ファイル72KB（フロッピー容量の約4.9%）',
        'DDA壁キャストと透視補正フロア/天井マッピング',
        '11種の敵 + 3ボス、20種のアイテム',
        '1.44MB GAME_DEV CONTEST 出品作',
      ],
    },
    en: {
      summary:
        'A first-person, turn-based dungeon crawler that fits on one 1.44MB floppy. Drawn with a DDA raycaster, across 15 procedural floors built with BSP.',
      role: 'Game Developer',
      highlights: [
        'A 72KB executable, about 4.9% of a floppy',
        'DDA wall casting with perspective-correct floor and ceiling mapping',
        '11 enemy types, 3 bosses, and 20 items',
        'An entry in the 1.44MB GAME_DEV CONTEST',
      ],
    },
  },
  {
    slug: 'vulkan-terrain',
    name: 'Vulkan Terrain (MoltenVK)',
    stack: ['C++', 'Vulkan', 'GLFW', 'GLSL', 'CMake', 'MoltenVK'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Vulkan' }],
    featured: true,
    ja: {
      summary:
        'macOS上でVulkan SDK（MoltenVK）とGLFWを使い、地形を描画するグラフィックス学習プロジェクト。シェーダコンパイルからスワップチェーン再作成までを実装。',
      role: '個人開発',
      highlights: [
        'Vulkanパイプラインとスワップチェーンの構築',
        'GLSLシェーダのSPIR-Vコンパイル',
        'ウィンドウリサイズ時のスワップチェーン再作成',
        'macOS向けMoltenVKによるクロスプラットフォーム対応',
      ],
    },
    en: {
      summary:
        'A graphics study on macOS that draws terrain with the Vulkan SDK (MoltenVK) and GLFW, from shader compilation through swapchain recreation.',
      role: 'Solo Developer',
      highlights: [
        'Vulkan pipeline and swapchain setup',
        'GLSL shaders compiled to SPIR-V',
        'Swapchain recreation on window resize',
        'macOS support through MoltenVK',
      ],
    },
  },
  {
    slug: 'terrain-opengl',
    name: 'OpenGL Terrain (macOS)',
    stack: ['C++', 'OpenGL', 'GLFW', 'GLAD', 'Make'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Terrain' }],
    ja: {
      summary:
        'macOS上でOpenGL 3.3 Core ProfileとC++を使ったグラフィックス開発環境。GLFW・GLADを用いたウィンドウ作成と基本レンダリング。',
      role: '個人開発',
      highlights: [
        'OpenGL 3.3 Core Profileコンテキスト',
        'GLADによるOpenGL関数ローディング',
        'Makefileベースのビルド環境',
      ],
    },
    en: {
      summary:
        'A graphics setup on macOS using OpenGL 3.3 Core Profile and C++. Window creation and basic rendering with GLFW and GLAD.',
      role: 'Solo Developer',
      highlights: [
        'OpenGL 3.3 Core Profile context',
        'OpenGL function loading with GLAD',
        'A Makefile-based build',
      ],
    },
  },
  {
    slug: 'color-wall-game',
    name: 'Color Wall Game',
    stack: ['C++', 'SDL2', 'SDL2_ttf'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/color-wall-game' }],
    ja: {
      summary:
        'C++とSDL2で制作したシンプルなアクションゲーム。指示された色の壁へWASDで移動し、制限時間内に接触してスコアを稼ぐ。',
      role: '個人開発',
      highlights: [
        'WASD操作とカウントダウン開始',
        '5回成功ごとに制限時間が短縮される難易度設計',
        '残り時間ゲージとスコアUI',
      ],
    },
    en: {
      summary:
        'A small action game in C++ and SDL2. Move with WASD to the wall of the called color and touch it before time runs out.',
      role: 'Solo Developer',
      highlights: [
        'WASD controls and a countdown start',
        'The time limit shrinks after every five successes',
        'A remaining-time gauge and score UI',
      ],
    },
  },
  {
    slug: 'ponggame',
    name: 'Pong Game (Multi-ball)',
    stack: ['C++', 'SDL2'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/ponggame' }],
    ja: {
      summary:
        'C++とSDL2で実装したクラシックPong。Sanjay Madhav著「Game Programming in C++」を参考に、マルチボール対応を追加。',
      role: '個人開発',
      highlights: ['ゲームループと入力処理', 'マルチボール対応の拡張実装', '衝突判定とスコア管理'],
    },
    en: {
      summary:
        'Classic Pong in C++ and SDL2, based on Sanjay Madhav’s Game Programming in C++, with a multi-ball extension.',
      role: 'Solo Developer',
      highlights: ['A game loop and input handling', 'A multi-ball extension', 'Collision and score tracking'],
    },
  },
  {
    slug: 'pacman-sfml',
    name: 'Pac-Man (SFML Remake)',
    stack: ['C++', 'SFML', 'CMake'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Pacman' }],
    ja: {
      summary:
        'C++とSFMLで制作したPac-Manリメイク。衝突判定、ゴーストAI、スプライト描画などゲームループの基礎を学習。',
      role: '個人開発',
      highlights: ['ゲームループとタイムステップ', '衝突判定とゴーストAI', 'スプライト・テキスト描画'],
    },
    en: {
      summary:
        'A Pac-Man remake in C++ and SFML, built to learn the game loop, collision, ghost AI, and sprite drawing.',
      role: 'Solo Developer',
      highlights: ['A game loop and timestep', 'Collision and ghost AI', 'Sprite and text drawing'],
    },
  },
  {
    slug: 'dicegame',
    name: 'DiceGame',
    stack: ['C++'],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/DiceGame' }],
    ja: {
      summary: 'C++の基礎文法（入出力、乱数、条件分岐）を学ぶためのシンプルなサイコロゲーム。',
      role: '開発者',
      highlights: ['標準入出力と文字列処理', '乱数生成と条件分岐'],
    },
    en: {
      summary: 'A simple dice game for learning C++ basics: input and output, random numbers, and branching.',
      role: 'Developer',
      highlights: ['Standard I/O and strings', 'Random numbers and branching'],
    },
  },
];

export function projectCategory(project: { stack: string[] }) {
  return project.stack.includes('Vulkan') || project.stack.includes('OpenGL') ? 'graphics' : 'game';
}

export function getProjects(locale: Locale): Project[] {
  return catalog.map(({ ja, en, ...project }) => ({ ...project, ...(locale === 'ja' ? ja : en) }));
}

export function localizeHref(href: string, locale: Locale) {
  const url = new URL(href);
  if (url.hostname.endsWith('steampowered.com')) {
    url.searchParams.set('l', locale === 'ja' ? 'japanese' : 'english');
  }
  return url.toString();
}
