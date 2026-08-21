#!/usr/bin/env bash
# 回滚 dshp-balance-hp 插件到「已知可用」冻结快照
# 用法：bash <仓库>/rollback.sh   （随后 sudo systemctl restart dsh）
set -euo pipefail
REPO="$(cd "$(dirname "$0")" && pwd)"
INSTALL="${DSHP_INSTALL_DIR:-/opt/dsh/profiles/web/node_modules/dshp-balance-hp}"
echo "== 回滚 dshp-balance-hp 到快照：$REPO/rollback -> $INSTALL"
mkdir -p "$INSTALL/lib"
cp "$REPO/rollback/package.json"     "$INSTALL/package.json"
cp "$REPO/rollback/cordis.patch.yml" "$INSTALL/cordis.patch.yml"
cp "$REPO/rollback/lib/host.js"      "$INSTALL/lib/host.js"
cp "$REPO/rollback/lib/client.js"    "$INSTALL/lib/client.js"
echo "== 文件已恢复。重启 Web 生效："
echo "   sudo systemctl restart dsh"
echo "== 提示：若 bundle 列表被重置，确认 profiles/web/package.json 的 dsh.profile.bundles 含 dshp-balance-hp"
