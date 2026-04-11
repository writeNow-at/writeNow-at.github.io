import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import BaseLayout from "./BaseLayout.vue";
import Archives from "./components/Archives.vue";
import BlogArchives from "./components/BlogArchives.vue";
import Author from "./components/Author.vue";
import CurationList from "./components/CurationList.vue";
import PostStats from "./components/PostStats.vue";
import Tags from "./components/Tags.vue";
import Pages from "./components/Pages.vue";
import Comment from "./components/GiscusComment.vue";
import RecentPosts from "./components/RecentPosts.vue";

import "./style.css";   // style 파일은 custom.css 등 네이밍만 다를 뿐, 자유롭게

export default {
  ...DefaultTheme,
  Layout: BaseLayout,
  enhanceApp({ app }) {
    // 글로벌 컴포넌트 등록
    app.component("Tags", Tags);
    app.component("Author", Author);
    app.component("Archives", Archives);
    app.component("BlogArchives", BlogArchives);
    app.component("CurationList", CurationList);
    app.component("PostStats", PostStats);
    app.component("Pages", Pages);
    app.component("Comment", Comment);
    app.component("RecentPosts", RecentPosts);
  },
} satisfies Theme;
