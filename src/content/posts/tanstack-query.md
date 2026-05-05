---
title: Tanstack Query Basics
blurb: Learning the basics
slug: tanstack-query-basics
publishedAt: 2026-04-02
---

# Tanstack Query Basics

This is a sample markdown file to show some text

```tsx
const { data } = useQuery({
  queryKey: ["fetched-data"],
  queryFn: async () => {
    const resp = await fetch("/some/api");

    if (!resp.ok) {
      throw new Error("Failed to fetch data");
    }

    return await resp.json();
  },
});
```
