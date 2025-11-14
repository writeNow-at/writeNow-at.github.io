---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "writeNow"
  text: "블로그 스터디"
  tagline: 중앙대학교 예술공학부 기반의 블로그 스터디 소모임 writeNow입니다.
  actions:
    - theme: alt
      text: 스터디 규칙
      link: /rules/rulebook

    - theme: alt
      text: 아카이브
      link: /posts

#     - theme: alt
#       text: 명예의 전당
#       link: /api-examples

#     - theme: alt
#       text: 큐레이션
#       link: /curation

---

<RecentPosts :count="5" />
