import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Recommend = () => import("@/views/recommend/Recommend.vue");
const Singer = () => import("@/views/singer/Singer.vue");
const Rank = () => import("@/views/rank/Rank.vue");
const Search = () => import("@/views/search/Search.vue");
const Songlist = () => import("@/views/songlist/Songlist.vue");
const Profile = () => import("@/views/profile/Profile.vue");

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    components: {
      default: Recommend
    }
  },
  {
    path: "/singer",
    component: Singer
  },
  {
    path: "/rank",
    component: Rank
  },
  {
    path: "/songlist",
    component: Songlist,
    redirect: "/songlist/playground",
    children: [
      {
        path: "playground",
        component: () => import("@/views/songlist/comps/SonglistPlayground.vue")
      },
      {
        path: "detail/:id",
        component: () => import("@/views/songlist/comps/SonglistDetail.vue")
      }
    ]
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/search",
    components: {
      default: Search
    },
    redirect: "/search/hots",
    children: [
      {
        path: "hots",
        component: () => import("@/views/search/comps/SearchHot.vue")
      },
      {
        path: "detail/:key",
        component: () => import("@/views/search/comps/DetailComplex.vue")
      },
      {
        path: "detail/solo/:key",
        component: () => import("@/views/search/comps/DetailSolo.vue")
      },
      {
        path: "detail/songlist/:key",
        component: () => import("@/views/search/comps/DetailSonglist.vue")
      },
      {
        path: "detail/singers/:key",
        component: () => import("@/views/search/comps/DetailSingers.vue")
      },
      {
        path: "detail/album/:key",
        component: () => import("@/views/search/comps/DetailAlbum.vue")
      },
      {
        path: "detail/users/:key",
        component: () => import("@/views/search/comps/DetailUsers.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
});
export default router;
