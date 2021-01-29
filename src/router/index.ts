import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const MainNavBar = () => import("components/content/mainNavBar/MainNavBar.vue");

const Recommend = () => import("views/recommend/Recommend.vue");
const Singer = () => import("views/singer/Singer.vue");
const Rank = () => import("views/rank/Rank.vue");
const Search = () => import("views/search/Search.vue");
const Detail = () => import("views/detail/Detail.vue");
const Profile = () => import("views/profile/Profile.vue");

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    components: {
      default: Recommend,
      one: MainNavBar
    }
  },
  {
    path: "/singer",
    components: {
      default: Singer,
      one: MainNavBar
    }
  },
  {
    path: "/rank",
    components: {
      default: Rank,
      one: MainNavBar
    }
  },
  {
    path: "/search",
    components: {
      default: Search
    }
  },
  {
    path: "/detail/:category/:id",
    component: Detail
  },
  {
    path: "/profile",
    component: Profile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
});
export default router;
