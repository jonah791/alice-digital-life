#!/usr/bin/env python3
"""生成生态中心仓（alice-digital-life）的插件目录块。

为什么要有这个脚本：中心仓 README 的清单**手工维护必然漂移**——实测从「16 个插件」写成
「21 个」再写成「47 个」（实际 50），且一张表被空行劈成两张。**能被机械生成的东西不要手抄。**

分工（判据单一真源）：
  · 编辑部分 = `scripts/hub-layers.json`（插件 → 层次归属 + 层次名/职责 + 排除项说明）
  · 机械部分 = 各插件 `package.json` 的 name/description/version（真源在插件仓库自己）

用法：
  python3 scripts/gen-hub-catalog.py            # 打印目录块（Markdown）
  python3 scripts/gen-hub-catalog.py --write    # 就地替换 README 的两个标记之间的内容
  python3 scripts/gen-hub-catalog.py --check    # 只校验：清单与磁盘实际是否一致（差异非零即退出 1）

README 里的标记（脚本只动这两行之间的内容）：
  <!-- CATALOG:START -->
  <!-- CATALOG:END -->
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)                      # E:/alice
PLUGIN_ROOT = os.path.join(ROOT, 'self-plugins')  # 可被 --plugins-root 覆盖
START, END = '<!-- CATALOG:START -->', '<!-- CATALOG:END -->'

# 层次归属文件：本仓叫 hub-layers.json；放进中心仓时随脚本一同拷贝为 layers.json
LAYERS_FILE = os.path.join(HERE, 'hub-layers.json')
if not os.path.exists(LAYERS_FILE):
    LAYERS_FILE = os.path.join(HERE, 'layers.json')


def load_layers() -> dict:
    with open(LAYERS_FILE, encoding='utf-8') as fh:
        return json.load(fh)


def scan_plugins() -> dict[str, dict]:
    """磁盘上真实存在的自研插件：目录名 → {version, description}。"""
    out: dict[str, dict] = {}
    for name in sorted(os.listdir(PLUGIN_ROOT)):
        d = os.path.join(PLUGIN_ROOT, name)
        if not os.path.isdir(os.path.join(d, '.git')):
            continue                                   # 只认独立仓库
        pkg_path = os.path.join(d, 'package.json')
        try:
            with open(pkg_path, encoding='utf-8') as fh:
                pkg = json.load(fh)
        except Exception:
            continue
        desc = str(pkg.get('description') or '').strip()
        # 一句话定位：取描述的第一句（描述有时带长解释，目录里只留一句）
        desc = re.split(r'[。；\n]|(?<=[a-z0-9)])\.\s', desc)[0].strip()
        out[name] = {'version': str(pkg.get('version') or '?'), 'description': desc}
    return out


def render(layers: dict, plugins: dict[str, dict]) -> str:
    assign: dict[str, str] = layers['assign']
    exclude: dict[str, str] = layers.get('exclude', {})
    owners = {**assign, **exclude}
    lines: list[str] = []

    missing = [p for p in plugins if p not in owners]
    ghost = [p for p in owners if p not in plugins]
    if missing or ghost:
        lines.append(f'> ⚠ 目录与磁盘不一致：未归类 {len(missing)} 个 {missing or ""}'
                     f'；清单里有但磁盘无 {len(ghost)} 个 {ghost or ""}')
        lines.append('')

    total = sum(1 for p in plugins if p in assign)
    lines.append(f'**{total} 个自研插件**（独立仓库）→ **{len(layers["_layers"])} 个模块** → **1 个系统**。'
                 f'本清单由 [`catalog/gen-catalog.py`](catalog/gen-catalog.py) 从各插件 `package.json` 生成，'
                 f'层次归属见 [`catalog/layers.json`](catalog/layers.json)（机械部分不手抄，编辑部分才手写）。')
    lines.append('')
    lines.append('| 模块 | 职责 | 插件 |')
    lines.append('|------|------|------|')
    by_layer: dict[str, list[str]] = {}
    for name, lid in assign.items():
        if name in plugins:
            by_layer.setdefault(lid, []).append(name)
    for layer in layers['_layers']:
        members = sorted(by_layer.get(layer['id'], []))
        if not members:
            continue
        links = ' · '.join(
            f'[{n}](https://github.com/jonah791/{n})' +
            (f' `v{plugins[n]["version"]}`' if plugins[n]['version'] not in ('?', '') else '')
            for n in members
        )
        lines.append(f"| **{layer['name']}**（{len(members)}） | {layer['duty']} | {links} |")
    lines.append('')
    lines.append('| 插件 | 版本 | 一句话定位 |')
    lines.append('|------|------|-----------|')
    for layer in layers['_layers']:
        for n in sorted(by_layer.get(layer['id'], [])):
            lines.append(f"| [{n}](https://github.com/jonah791/{n}) | `{plugins[n]['version']}` "
                         f"| {plugins[n]['description']} |")
    if exclude:
        lines.append('')
        for n, why in exclude.items():
            lines.append(f'> 未收录：`{n}` —— {why}')
    return '\n'.join(lines)


def render_market(layers: dict, plugins: dict[str, dict]) -> str:
    """生成 DSH Community Market 目录载荷（catalog/v1/plugins.json）。

    与 README 目录块**同一真源**（hub-layers.json + 各插件 package.json）——两处各维护必然漂移：
    实测市场目录停在 5 个（只剩安全插件）而自研插件已 49 个，且其 manifest 自述涵盖
    "agent infrastructure"，与内容不符。

    诚实性：`package.registry` 一律写 `github`（可验证：仓库公开可 clone）。
    插件是否另发 npm 由各插件 README 说明——**不在目录里替它宣称**。
    """
    import datetime
    assign: dict[str, str] = layers['assign']
    layer_name = {l['id']: l['name'] for l in layers['_layers']}
    items = []
    for name in sorted(p for p in plugins if p in assign):
        lid = assign[name]
        items.append({
            'identifier': name,
            'name': name,
            'summary': plugins[name]['description'] or name,
            'description': f"{plugins[name]['description']}（{layer_name.get(lid, lid)} · v{plugins[name]['version']}）",
            'categories': [lid, 'dsh-plugin'],
            'capabilities': ['tools'],
            'repository': {'url': f'https://github.com/jonah791/{name}'},
            'package': {'registry': 'github', 'name': name},
            'publisher': {'name': 'Alice', 'url': 'https://github.com/jonah791'},
        })
    today = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d')
    payload = {
        'schemaVersion': '1.0.0',
        'generatedAt': f'{today}T00:00:00Z',
        'revision': f'{today}.1',
        'items': items,
        'page': {'nextCursor': None, 'total': len(items)},
    }
    return json.dumps(payload, ensure_ascii=False, indent=2) + '\n'


def main() -> int:
    global PLUGIN_ROOT, LAYERS_FILE
    ap = argparse.ArgumentParser()
    ap.add_argument('--readme', default=None, help='中心仓 README 路径（--write/--check 用）')
    ap.add_argument('--market', default=None, help='市场目录 JSON 输出路径（可选）')
    ap.add_argument('--plugins-root', default=None, help='插件根目录（缺省 <脚本上级>/self-plugins）')
    ap.add_argument('--layers', default=None, help='层次归属 JSON（缺省与脚本同目录的 hub-layers.json / layers.json）')
    ap.add_argument('--write', action='store_true')
    ap.add_argument('--check', action='store_true')
    args = ap.parse_args()
    if args.plugins_root:
        PLUGIN_ROOT = args.plugins_root
    if args.layers:
        LAYERS_FILE = args.layers

    layers = load_layers()
    plugins = scan_plugins()
    block = render(layers, plugins)

    if args.market:
        with open(args.market, 'w', encoding='utf-8', newline='\n') as fh:
            fh.write(render_market(layers, plugins))
        print(f'已写入市场目录 {args.market}')
        if not (args.write or args.check):
            return 0

    if args.check:
        if not args.readme:
            print('--check 需要 --readme'); return 2
        with open(args.readme, encoding='utf-8') as fh:
            text = fh.read()
        m = re.search(re.escape(START) + r'(.*?)' + re.escape(END), text, re.S)
        if not m:
            print(f'README 缺标记 {START} / {END}'); return 1
        inside = m.group(1).strip()
        if inside == block.strip():
            print('目录块与磁盘一致 ✓'); return 0
        print('⚠ 目录块与磁盘**不一致** —— 跑 --write 重新生成')
        return 1

    if args.write:
        if not args.readme:
            print('--write 需要 --readme'); return 2
        with open(args.readme, encoding='utf-8') as fh:
            text = fh.read()
        if START not in text or END not in text:
            print(f'README 缺标记 {START} / {END}'); return 1
        new = re.sub(re.escape(START) + r'.*?' + re.escape(END),
                     START + '\n' + block + '\n' + END, text, flags=re.S)
        with open(args.readme, 'w', encoding='utf-8', newline='\n') as fh:
            fh.write(new)
        print(f'已写入 {args.readme}（{len(block.splitlines())} 行目录块）')
        return 0

    print(block)
    return 0


if __name__ == '__main__':
    sys.exit(main())
