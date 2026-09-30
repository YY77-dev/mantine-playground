# mantine-playground

[Mantine](https://mantine.dev) のコンポーネントとフックの使い方を、動かしながら確かめるための Next.js プロジェクトです。

トップページに、次のパッケージに入っているコンポーネントとフックの使用例を並べています。

| パッケージ               | 内容                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `@mantine/core`          | レイアウト、ボタン、入力フォーム、ナビゲーション、表示、オーバーレイなどのコンポーネント |
| `@mantine/dates`         | カレンダーや日付・時刻の入力                                                             |
| `@mantine/hooks`         | 状態管理、DOM、ブラウザの機能などのフック                                                |
| `@mantine/form`          | フォームの値とバリデーションの管理                                                       |
| `@mantine/notifications` | トースト通知                                                                             |

## 使っているもの

- Next.js 16（App Router、Turbopack）
- Mantine 9
- Tailwind CSS 4
- Node.js 22（`.tool-versions` で指定）、pnpm 9

## 動かし方

```sh
pnpm install
pnpm dev
```

ブラウザで http://localhost:3000 を開きます。

## 同じ LAN の他の端末から開く

Next.js の開発サーバーは、localhost 以外のアドレスから開くと JavaScript の読み込みをブロックします。他の端末から開く場合は、`.env.example` を `.env.local` にコピーし、PC の IP を書きます。

```sh
cp .env.example .env.local
```

```sh
# .env.local
ALLOWED_DEV_ORIGINS=192.168.1.6
```

WSL2 で動かす場合は、WSL をミラーモード（`.wslconfig` に `networkingMode=mirrored`）にし、ポート 3000 の受信をファイアウォールで許可する必要があります。

## ファイルの場所

| パス                                       | 内容                                             |
| ------------------------------------------ | ------------------------------------------------ |
| `src/app/page.tsx`                         | トップページ。`ShowcasePage` を表示するだけ      |
| `src/components/showcase/ShowcasePage.tsx` | ページ全体の枠（AppShell、目次、配色の切り替え） |
| `src/components/showcase/*Showcase.tsx`    | カテゴリごとの使用例                             |
| `src/components/showcase/Section.tsx`      | 見出しとカードの共通部品                         |

## コマンド

| コマンド          | 内容                          |
| ----------------- | ----------------------------- |
| `pnpm dev`        | 開発サーバーを起動する        |
| `pnpm build`      | 本番用にビルドする            |
| `pnpm lint`       | ESLint でチェックする         |
| `pnpm type-check` | TypeScript の型チェックをする |
| `pnpm format`     | Prettier で整形する           |
