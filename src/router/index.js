import { createRouter, createWebHistory } from "vue-router";

const MainNavBar = () => import("components/content/mainNavBar/MainNavBar");

const Recommend = () => import("views/recommend/Recommend");
const Singer = () => import("views/singer/Singer");
const Rank = () => import("views/rank/Rank");
const Search = () => import("views/search/Search");
const Detail = () => import("views/detail/Detail");
const Profile = () => import("views/profile/Profile");

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
  routes
});
export default router;
