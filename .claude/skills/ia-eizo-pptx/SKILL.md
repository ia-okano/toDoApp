---
name: ia-eizo-pptx
description: Generate PowerPoint (.pptx) decks that follow the "IA 映像教材用 (FMT)" design system — cover page (扉/表紙), section dividers (中表紙), and content pages with heading levels 1/2/3 and body text, page numbers bottom-right, no copyright. Use whenever the user wants to create a slide deck, presentation, or template in this IA format / design system, or asks to make slides "in the same format" as the IA FMT template.
---

# IA 映像教材フォーマット pptx 生成

元の `FMT_mini.pptx` から抽出したデザインシステムに完全準拠した pptx を作る Skill。
スライドマスター・レイアウト・テーマ・画像を収めた `assets/base_template.pptx`
を**そのまま再利用**し、その上にスライドを構築するため、扉ページ・上部バー・
配色・フォントが忠実に踏襲される。

## 使い方

1. JSON のスライド定義を書く（`examples/sample_spec.json` をコピーして編集）。
2. 生成スクリプトを実行する:

```bash
python3 .claude/skills/ia-eizo-pptx/scripts/build_deck.py <spec.json> -o 出力.pptx
```

`python-pptx` が必要（未インストールなら `pip install python-pptx`）。

### 最小例

```json
{
  "output": "deck.pptx",
  "slides": [
    {"type": "cover",   "title": "タイトル"},
    {"type": "section", "title": "第1章 概要"},
    {"type": "content", "title": "ページ見出し",
        "heading2": "セクション見出し",
        "body": [{"text": "本文です。"}, {"text": "箇条書き", "bullet": true}]}
  ]
}
```

## スライドタイプ

| type | レイアウト | フィールド |
|------|-----------|-----------|
| `cover` | 表紙 | `title`（中央タイトル36pt、背景＋ロゴ付き） |
| `section` | 中表紙 | `title`（中央タイトル36pt） |
| `content` | 1カラム | `title`(L1), `heading2`(L2), `heading3`(L3), `body`[] |
| `two_column` | ２カラム | `title`(L1), `left`{heading3,body}, `right`{heading3,body} |

`body` の各要素:
- `{"text": "..."}` 単純な段落
- `{"text": "...", "bullet": true, "level": 0}` 箇条書き（`level` 0〜1、リストは2層まで）
- `{"text": "...", "size": 2000, "bold": true, "color": "FF4B4B"}` 装飾指定
- `{"runs": [{"text": "..."}, {"text": "強調", "bold": true, "color": "FF4B4B"}]}` 行内で書式混在

色は schemeClr 名（`bg1`,`tx1`,`tx2`,`accent1`..`accent6`）または6桁16進。

## デザインシステム仕様（抽出結果）

- **サイズ**: 16:9 (12192000 × 6858000 EMU / 33.87 × 19.05 cm)
- **テーマ**: 「IA映像教材用」
- **フォント**: 游ゴシック（ea/latin）, 源ノ角ゴシック Code JP M
- **配色**: 本文 `tx1`=#333333 / シアン `tx2`=#2BACED / 赤 `accent1`=#FF4B4B /
  緑 `accent2`=#1BB58D / 金 `accent3`=#EBAB1D / 白 `bg1`=#FFFFFF
- **扉（表紙）**: 全面背景＋ロゴ、中央タイトル 36pt
- **中表紙**: 全面背景、中央タイトル 36pt
- **見出しレベル1**: 上部シアンバー、28pt 太字 白(bg1)
- **見出しレベル2**: 28pt 太字 シアン(tx2)
- **見出しレベル3**: 24pt 太字 ダーク(tx1)
- **本文**: 24pt 細字 ダーク(tx1)、行間 1.3、最小 16pt 目安／強調は太字、重要は赤太字
- **ページ番号**: 右下（マスター既定の placeholder）。`content`/`two_column` のみ付与し、
  表紙・中表紙には付けない。
- **コピーライト**: マスター・レイアウトから削除済み（出力に含めない）。

## ファイル構成

- `scripts/build_deck.py` — JSON → pptx 生成ツール（デザイン定数はここに集約）
- `assets/base_template.pptx` — マスター/レイアウト/テーマ/画像のみ（本文スライド0枚、著作権表記なし）
- `examples/sample_spec.json` — 全タイプを網羅したサンプル定義

## メンテナンス

- 見出しサイズ・余白・色などの既定値は `scripts/build_deck.py` 冒頭の定数で調整可能。
- 元テンプレートのデザインを更新したい場合は、新しい元 pptx から本文スライドと
  著作権テキストボックスを除去したものを `assets/base_template.pptx` として差し替える。
