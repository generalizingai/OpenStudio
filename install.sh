#!/usr/bin/env bash
#
# OpenStudio one-command installer.
#
#   curl -fsSL https://raw.githubusercontent.com/generalizingai/OpenStudio/main/install.sh | bash
#
# Clones OpenStudio, installs dependencies, builds the workspace packages,
# then starts the app and opens it in your browser.

set -euo pipefail

REPO_URL="https://github.com/generalizingai/OpenStudio.git"
APP_DIR="${OPENSTUDIO_DIR:-$HOME/OpenStudio}"
DEFAULT_PORT="3000"

# ----- pretty output -----
if [ -t 1 ]; then
  BOLD=$'\033[1m'; WHITE=$'\033[1;97m'; LIME=$'\033[1;38;5;191m'; RED=$'\033[31m'; DIM=$'\033[2m'; RESET=$'\033[0m'
else
  BOLD=""; WHITE=""; LIME=""; RED=""; DIM=""; RESET=""
fi
say() { printf "%s\n" "${LIME}▸${RESET} $*"; }
ok()  { printf "%s\n" "${LIME}✓${RESET} $*"; }
die() { printf "%s\n" "${RED}✗ $*${RESET}" >&2; exit 1; }

banner() {
  printf "\n%b" "$WHITE"
  cat <<'ART'
   █████   █████   █████   █   █
   █   █   █   █   █       ██  █
   █   █   █████   ████    █ █ █
   █   █   █       █       █  ██
   █████   █       █████   █   █
ART
  printf "%b" "$LIME"
  cat <<'ART'
   █████   █████   █   █   ████    █████   █████
   █         █     █   █   █   █     █     █   █
   █████     █     █   █   █   █     █     █   █
       █     █     █   █   █   █     █     █   █
   █████     █     █████   ████    █████   █████
ART
  printf "%b\n" "$RESET"
  printf "%s\n\n" "${DIM}   one-command installer${RESET}"
}

banner

# ----- prerequisites -----
command -v git  >/dev/null 2>&1 || die "git is required - install it from https://git-scm.com/downloads"
command -v node >/dev/null 2>&1 || die "Node.js 18+ is required - install it from https://nodejs.org/"
command -v npm  >/dev/null 2>&1 || die "npm is required (it ships with Node.js)."

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 18 ] || die "Node.js 18+ required (found $(node -v)). Update at https://nodejs.org/"
ok "Node $(node -v) / npm v$(npm -v)"

# ----- clone or update -----
if [ -d "$APP_DIR/.git" ]; then
  say "Updating existing install at ${BOLD}$APP_DIR${RESET}"
  git -C "$APP_DIR" pull --ff-only || true
else
  say "Cloning OpenStudio into ${BOLD}$APP_DIR${RESET}"
  git clone --depth 1 "$REPO_URL" "$APP_DIR"
fi
cd "$APP_DIR"
ok "Source ready"

# ----- install + build -----
say "Installing dependencies and building packages (this can take a few minutes)..."
npm run setup
ok "Build complete"

# ----- launch -----
say "Starting OpenStudio..."
LOG="$(mktemp)"
npm run dev >"$LOG" 2>&1 &
DEV_PID=$!
trap 'kill "$DEV_PID" 2>/dev/null || true' EXIT INT TERM

URL=""
for _ in $(seq 1 120); do
  if ! kill -0 "$DEV_PID" 2>/dev/null; then
    cat "$LOG"; die "The dev server exited unexpectedly."
  fi
  URL="$(grep -oE 'http://localhost:[0-9]+' "$LOG" | head -1 || true)"
  [ -n "$URL" ] && break
  sleep 1
done
[ -n "$URL" ] || URL="http://localhost:$DEFAULT_PORT"

open_url() {
  if   command -v open     >/dev/null 2>&1; then open "$1" >/dev/null 2>&1 || true
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$1" >/dev/null 2>&1 || true
  fi
}

printf "\n"
ok "OpenStudio is running at ${BOLD}$URL${RESET}"
say "Opening your browser..."
open_url "$URL"
printf "\n%s\n" "${DIM}Enter your MuAPI key (https://muapi.ai/access-keys) on first use.${RESET}"
printf "%s\n\n" "${DIM}Press Ctrl+C to stop the server.${RESET}"

wait "$DEV_PID"
