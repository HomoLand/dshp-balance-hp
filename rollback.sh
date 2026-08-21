#!/usr/bin/env bash
# 回滚 dshp-balance-hp（主包 + 桥接包）到「已知可用」冻结快照
# 用法：bash <仓库>/rollback.sh   （随后 sudo systemctl restart dsh）
set -euo pipefail
REPO="$(cd "$(dirname "$0")" && pwd)"
WEB="${DSHP_PROFILE_WEB:-/opt/dsh/profiles/web}"
MAIN="$WEB/node_modules/dshp-balance-hp"
BRIDGE="$WEB/node_modules/dshp-balance-hp-bridge"
echo "== 回滚到快照：$REPO/rollback"
mkdir -p "$MAIN/lib" "$BRIDGE/lib"
cp "$REPO/rollback/package.json"           "$MAIN/package.json"
cp "$REPO/rollback/cordis.patch.yml"       "$MAIN/cordis.patch.yml"
cp "$REPO/rollback/lib/host.js"            "$MAIN/lib/host.js"
cp "$REPO/rollback/lib/client.js"          "$MAIN/lib/client.js"
cp "$REPO/rollback/bridge/package.json"    "$BRIDGE/package.json"
cp "$REPO/rollback/bridge/cordis.patch.yml" "$BRIDGE/cordis.patch.yml"
cp "$REPO/rollback/bridge/lib/index.js"    "$BRIDGE/lib/index.js"
cp "$REPO/rollback/bridge/lib/client.js"   "$BRIDGE/lib/client.js"
echo "== 已恢复。重启生效："
echo "   sudo systemctl restart dsh"
echo "== 提示：确认 profiles/web/package.json 的 dsh.profile.bundles 含 dshp-balance-hp-bridge 与 dshp-balance-hp"
