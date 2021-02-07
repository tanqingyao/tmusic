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
    component: Singer,
    redirect: "/singer/lists",
    children: [
      {
        path: "lists",
        component: () => import("@/views/singer/comps/SingerLists.vue")
      },
      {
        path: "detail/:id",
        component: () => import("@/views/singer/comps/SingerDetail.vue")
        // redirect: "/singer/detail/:id/home",
        // children: [
        //   {
        //     path: "home",
        //     component: () => import("@/views/singer/comps/DetailHome.vue")
        //   },
        //   {
        //     path: "song",
        //     component: () => import("@/views/singer/comps/DetailSong.vue")
        //   },
        //   {
        //     path: "album",
        //     component: () => import("@/views/singer/comps/DetailAlbum.vue")
        //   },
        //   {
        //     path: "video",
        //     component: () => import("@/views/singer/comps/DetailVideo.vue")
        //   },
        //   {
        //     path: "avtivity",
        //     component: () => import("@/views/singer/comps/DetailActivity.vue")
        //   }
        // ]
      }
    ]
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
        component: () => import("@/views/search/comps/SearchResult.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[]
});
export default router;
