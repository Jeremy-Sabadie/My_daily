#!/usr/bin/env bash
set -euo pipefail

export MYPOPOTE_HEALTH_URL="http://127.0.0.1:18081/"
export PRODUCTPULSE_HEALTH_URL="http://127.0.0.1:18091/"
export PAPERLESS_HEALTH_URL="http://127.0.0.1:18085/"
export KUMA_HEALTH_URL="http://127.0.0.1:13001/"

exec node server/news.mjs
