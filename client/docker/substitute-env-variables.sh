#!/usr/bin/env sh

set -o errexit
set -o nounset 
set -o pipefail

: "${BASE_URL}" # ensure API_HOST exists and exit otherwise

cat <<EOF > /usr/share/nginx/html/env.js
window.env = {};
window.env.BASE_URL = "$BASE_URL";
EOF