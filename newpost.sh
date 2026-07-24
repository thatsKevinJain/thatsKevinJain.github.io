#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 \"<Blog Name>\""
  exit 1
fi

name="$1"
slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-')
date=$(date +%Y-%m-%d)
file="_posts/${date}-${slug}.md"

if [ -e "$file" ]; then
  echo "File already exists: $file"
  exit 1
fi

cat > "$file" <<EOF
---
layout: post
title:  "$name"
date:   $date
categories: jekyll update
---

EOF

echo "Created $file"
