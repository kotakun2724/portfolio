# Kota Ito — Playable Worlds

Astro製の静的ポートフォリオ。Three.jsで描画する小さな浮島のダンジョンと、ゲーム・グラフィックス作品のアーカイブです。本番URLは https://kotakun.dev です。

## 開発

```sh
npm ci
npm run dev
```

表示されたローカルURLを開いてください（通常は `http://localhost:4321`）。

```sh
npm run check
npm run build
npm run preview
```

`check` はAstro/TypeScriptの型チェック、`build` は4ページの静的生成、`preview` は生成済みページの確認です。開発サーバーとビルドは同時に起動せず、公開前には `build` → `preview` の順に確認してください。

## 編集する場所

- `src/content/profile.ts`: プロフィール、技術、連絡先
- `src/content/projects.ts`: 作品名、説明、画像、外部リンク、開発のポイント
- `src/scripts/dungeon.ts`: Three.jsのシーン、操作、クリスタル収集
- `src/components/Dungeon.astro`: 3DエリアのUIと遅延読み込み
- `src/styles/global.css`: 色、タイポグラフィ、レスポンシブレイアウト

ページは `/`、`/projects`、`/about`、`/contact`。英語版は同じ構成で `/en` 以下です。ヘッダーの JA / EN で、見ているページの言語を切り替えます。作品一覧ではGame/Graphicsを絞り込み、各作品の開発ポイントを開けます。文言は `src/i18n.ts`、作品の説明は `src/content/projects.ts` です。

## 3Dの操作と配慮

- 横ドラッグ、またはキャンバスにフォーカスして左右キーで回転。Homeキーで角度を戻します。
- 光るクリスタルを3つクリックするとゲートが開きます。Tab + Enterでも収集できます。
- リセットボタンで再プレイ、一時停止ボタンで動きを止められます。
- OSの「視差効果を減らす」設定では、最初からアニメーションを停止します。
- 画面外・非表示タブでは描画を止め、画素密度を上限1.6に制限しています。
- Three.jsはホームの3Dエリアが近づいたときだけ読み込みます。他ページには読み込みません。
- WebGLが使えないときはCSSの静止画に切り替わります。ナビゲーションと作品情報はJavaScriptなしでも利用できます。
- 縦方向のタッチスクロールを維持します。

## アセット

3Dシーンはコードで組み立てたオリジナル形状です。モデルやテクスチャの外部読み込みはありません。掲載作品の画像は既存サイトで使用していた以下のものをローカルに保存しています。

- `public/images/mugendungeon.jpg`: 既存のSteam掲載スクリーンショット
- `public/images/lost-disk.png`: `kotakun2724/1.44MB` の `screenshots/title.png`
- `public/kotakun.jpg`: 既存のプロフィール画像

画像のない作品には、実際のスクリーンショットと区別したコード生成の図案を表示しています。フォントはGoogle Fonts（Space Grotesk / DM Sans）で、読み込めない場合はシステムフォントへ切り替わります。

## Vercel

既存のAstro/Vercel構成を維持しています。

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Canonical URL: `astro.config.mjs` の `site: 'https://kotakun.dev'`

サーバー機能、データベース、秘密鍵は不要です。
