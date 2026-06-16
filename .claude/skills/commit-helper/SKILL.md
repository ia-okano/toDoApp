---
name: commit-helper
description: "Conventional Commits 形式のコミットメッセージを作成・整形するための練習用スキル。ユーザーが「コミットメッセージを考えて」「commit message を作って」「この変更のコミット文を整えて」などと頼んだとき、または変更内容を Conventional Commits 形式にまとめたいときに使う。"
---

# Commit Helper(練習用スキル)

変更内容を [Conventional Commits](https://www.conventionalcommits.org/) 形式の
コミットメッセージに整えるための、シンプルな練習用スキルです。

> このスキルは「あとから編集・追加して育てる」ことを前提にしています。
> 下の各セクションは行を足すだけで拡張できます。

---

## 出力フォーマット

```
<type>(<scope>): <subject>

<body(任意・なぜ変更したかを説明)>
```

- `type` … 変更の種類(下の表から選ぶ)
- `scope` … 変更箇所(任意。例: `auth`, `ui`, `api`)
- `subject` … 命令形・現在形・50文字以内・末尾にピリオドを付けない
- `body` … 任意。「何を」より「なぜ」を書く

---

## type 一覧

<!-- ここに行を足すだけで型を増やせます -->

| type     | 用途                                   |
|----------|----------------------------------------|
| feat     | 新機能の追加                           |
| fix      | バグ修正                               |
| docs     | ドキュメントのみの変更                 |
| style    | 動作に影響しない整形(空白・セミコロン)|
| refactor | 機能変更を伴わないコード改善           |
| test     | テストの追加・修正                     |
| chore    | ビルド・補助ツール・依存関係などの雑務 |

---

## 手順

1. 変更内容(diff や説明)を確認する。不明なら `git diff` / `git status` を見る。
2. 最も合う `type` を上の表から1つ選ぶ。
3. 変更箇所がはっきりしていれば `scope` を付ける(任意)。
4. `subject` を命令形・50文字以内で書く。
5. 理由の説明が必要なら `body` を付ける。
6. 完成したメッセージをコードブロックで提示する。

---

## 例

```
feat(todo): add due-date field to task model

期限管理の要望が多かったため、タスクに期限日を追加。
```

```
fix(ui): prevent empty task from being saved
```

```
docs: update setup steps in README
```

---

## メモ(拡張アイデア)

<!-- 練習で育てる用のメモ欄。自由に追記してください -->

- 絵文字プレフィックス(`✨ feat:` など)に対応させる
- BREAKING CHANGE フッターのルールを追加する
- 日本語 subject を許可するか英語に統一するかを決める
