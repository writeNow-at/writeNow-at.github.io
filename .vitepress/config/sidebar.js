const blogsPages = {
  "/blogs/": [
    {
      text: "소개",
      collapsed: false,
      items: [
        { text: "블로그 챌린지 연혁", link: "pages/blogs/info/timeline" },
        // { text: "챌린지 참여자", link: "pages/blogs/info/users" },
      ],
    },
    {
      text: "큐레이션",
      collapsed: false,
      items: [
        { text: "1기 큐레이션", link: "pages/blogs/curation/1th" },
        { text: "2기 큐레이션", link: "pages/blogs/curation/2nd" },
        // { text: "3기 큐레이션", link: "pages/blogs/curation/3rd" },
      ],
    },
    // {
    //   text: "활동",
    //   collapsed: false,
    //   items: [
    //     { 
    //       text: "1기 활동", 
    //       collapsed: true,
    //       items: [
    //         { text: "제 1회 깃허브 쓰기 운동", link: "pages/blogs/events/rulebook" },
    //         { text: "1기 회고 활동", link: "pages/blogs/events/blog-guide" },
    //       ],
    //     },
    //   ],
    // }
  ],
};

const postsPages = {
  "/posts/": [
    {
      text: "아카이브",
      link: "/posts/",
      collapsed: false,
      items: [
        { text: "태그", link: "/posts/tags" },
        { text: "작성자", link: "/posts/author" },
        // { text: "1기 (250501~250830)", link: "/posts/2025-C1" },
      ],
    },
  ],
};

const infoPages = {
  "/rules/": [
    {
      text: "규칙",
      collapsed: false,
      items: [
        { text: "챌린지 규칙", link: "/rules/rulebook" },
        { text: "블로그 가이드", link: "/rules/blog-guide" },
        { text: "신청하기", link: "/rules/check-in" },
      ],
    },
  ],
};

// const componentPages = {
//   "/posts/component/": [
//     {
//       text: "Components",
//       items: [],
//     },
//   ],
// };


export default {
  ...blogsPages,
  ...postsPages,
  ...infoPages,
  // ...componentPages,
};