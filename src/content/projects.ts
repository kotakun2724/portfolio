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
    slug: '1-44mb',
    name: '1.44 MB :: Sectors of the Lost Disk',
    summary:
      '1.44MBフロッピーディスク1枚に収まる、FPS視点のターンベース・ダンジョンクロウル。DDAレイキャスターで描画し、BSP分割による15フロアの手続き生成ダンジョンを探索する。',
    role: 'ゲーム開発者',
    stack: ['C', 'Raycasting', 'BSP', 'MinGW-w64'],
    highlights: [
      '実行ファイル72KB（フロッピー容量の約4.9%）',
      'DDA壁キャストと透視補正フロア/天井マッピング',
      '11種の敵 + 3ボス、20種のアイテム',
      '1.44MB GAME_DEV CONTEST 出品作',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/1.44MB' }],
    featured: true,
    isGame: true,
    image: 'https://raw.githubusercontent.com/kotakun2724/1.44MB/main/screenshots/title.png',
  },
  {
    slug: 'vulkan-terrain',
    name: 'Vulkan Terrain (MoltenVK)',
    summary:
      'macOS上でVulkan SDK（MoltenVK）とGLFWを使い、地形を描画するグラフィックス学習プロジェクト。シェーダコンパイルからスワップチェーン再作成までを実装。',
    role: 'Solo Developer',
    stack: ['C++', 'Vulkan', 'GLFW', 'GLSL', 'CMake', 'MoltenVK'],
    highlights: [
      'Vulkanパイプラインとスワップチェーンの構築',
      'GLSLシェーダのSPIR-Vコンパイル',
      'ウィンドウリサイズ時のスワップチェーン再作成',
      'macOS向けMoltenVKによるクロスプラットフォーム対応',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Vulkan' }],
    featured: true,
  },
  {
    slug: 'terrain-opengl',
    name: 'OpenGL Terrain (macOS)',
    summary:
      'macOS上でOpenGL 3.3 Core ProfileとC++を使ったグラフィックス開発環境。GLFW・GLADを用いたウィンドウ作成と基本レンダリング。',
    role: 'Solo Developer',
    stack: ['C++', 'OpenGL', 'GLFW', 'GLAD', 'Make'],
    highlights: [
      'OpenGL 3.3 Core Profileコンテキスト',
      'GLADによるOpenGL関数ローディング',
      'Makefileベースのビルド環境',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Terrain' }],
  },
  {
    slug: 'color-wall-game',
    name: 'Color Wall Game',
    summary:
      'C++とSDL2で制作したシンプルなアクションゲーム。指示された色の壁へWASDで移動し、制限時間内に接触してスコアを稼ぐ。',
    role: 'Solo Developer',
    stack: ['C++', 'SDL2', 'SDL2_ttf'],
    highlights: [
      'WASD操作とカウントダウン開始',
      '5回成功ごとに制限時間が短縮される難易度設計',
      '残り時間ゲージとスコアUI',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/color-wall-game' }],
  },
  {
    slug: 'ponggame',
    name: 'Pong Game (Multi-ball)',
    summary:
      'C++とSDL2で実装したクラシックPong。Sanjay Madhav著「Game Programming in C++」を参考に、マルチボール対応を追加。',
    role: 'Solo Developer',
    stack: ['C++', 'SDL2'],
    highlights: [
      'ゲームループと入力処理',
      'マルチボール対応の拡張実装',
      '衝突判定とスコア管理',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/ponggame' }],
  },
  {
    slug: 'pacman-sfml',
    name: 'Pac-Man (SFML Remake)',
    summary:
      'C++とSFMLで制作したPac-Manリメイク。衝突判定、ゴーストAI、スプライト描画などゲームループの基礎を学習。',
    role: 'Solo Developer',
    stack: ['C++', 'SFML', 'CMake'],
    highlights: [
      'ゲームループとタイムステップ',
      '衝突判定とゴーストAI',
      'スプライト・テキスト描画',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/Pacman' }],
  },
  {
    slug: 'dicegame',
    name: 'DiceGame',
    summary:
      'C++の基礎文法（入出力、乱数、条件分岐）を学ぶためのシンプルなサイコロゲーム。',
    role: 'Developer',
    stack: ['C++'],
    highlights: [
      '標準入出力と文字列処理',
      '乱数生成と条件分岐',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/kotakun2724/DiceGame' }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
