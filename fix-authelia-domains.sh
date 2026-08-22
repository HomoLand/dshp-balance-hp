#!/usr/bin/env bash
# 修复 Authelia 域名/Cookie 配置，解决：
#   1) 2FA 在普通模式一直报错（Cookie 域名与访问域名不一致）
#   2) 除 dsh-v6.maoyulong.club:30443 外的域名循环登录页（access_control 未覆盖）
# 用法：sudo bash fix-authelia-domains.sh
set -euo pipefail

CONF="${AUTHELIA_CONFIG:-/opt/dsh/authelia/configuration.yml}"
[ -f "$CONF" ] || { echo "找不到 $CONF"; exit 1; }
[ "$(id -u)" -eq 0 ] || { echo "请用 sudo 运行本脚本"; exit 1; }

TS="$(date +%Y%m%d%H%M%S)"
cp "$CONF" "$CONF.bak-$TS"
echo "== 已备份：$CONF.bak-$TS"

python3 - "$CONF" <<'PY'
import sys
path = sys.argv[1]
s = open(path, encoding='utf-8').read()
orig = s

# 1) 会话 Cookie 域名：dsh.maoyulong.club -> 父域 maoyulong.club（跨两个子域共享会话）
a = "      domain: dsh.maoyulong.club"
b = "      domain: maoyulong.club"
assert a in s, "未找到 session.cookies 的 domain 行"
s = s.replace(a, b, 1)

# 2) authelia_url 指向实际登录门户
a = "      authelia_url: https://dsh.maoyulong.club/auth"
b = "      authelia_url: https://dsh-v6.maoyulong.club:30443/auth"
assert a in s, "未找到 authelia_url 行"
s = s.replace(a, b, 1)

# 3) access_control 增加 dsh-v6.maoyulong.club 规则
anchor = "    - domain: dsh.maoyulong.club"
assert anchor in s, "未找到 access_control 规则锚点"
if "    - domain: dsh-v6.maoyulong.club" not in s:
    newrule = '    - domain: dsh-v6.maoyulong.club\n      policy: two_factor\n      subject: "group:admins"'
    s = s.replace(anchor, anchor + "\n" + newrule, 1)

if s == orig:
    print("== 配置已是最新，无需改动")
else:
    open(path, 'w', encoding='utf-8').write(s)
    print("== 已写入新配置")
PY

echo
echo "== 完成。接下来："
echo "   1) 重启 Authelia： sudo systemctl restart authelia   # 或重启 Authelia 容器/Deployment"
echo "   2) 清浏览器 maoyulong.club 的 Cookie 后再登录"
echo "   3) 如还有其它访问域名，需在 access_control.rules 追加对应规则，并把域名加入 dsh.service 的 --trusted-host"
