import {createRouter, createWebHistory} from 'vue-router'
const Full = () => import('../views/Full.vue')
const Login = () => import('../views/LoginPage.vue')
const Register = () => import('../views/RegisterPage.vue')
const User = () => import('../views/User.vue')
const Diagram = () =>import('../views/BarBlock.vue')

const routes = [
  {
    path: "/scoop",
    component: Full,
    children: [
      {
        path: "/login",
        name: "LoginPage",
        component: Login
      },
      {
        path: "/register",
        name: "RegisterPage",
        component: Register
      },
      {
        path: "/dashboard",
        name: "DashboardPage",
        component: User
      },
      {
        path: "/diagram",
        name: "DiagramPage",
        component: Diagram
      },{
        path: '/edit_user/:id',
        name: 'EditPage',
        component: () => import('../views/Edit.vue'),
      }
    ]
  }
]
  const router = new createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
  });
  
  router.beforeEach((to, from, next)=>{
     next();
  })
  
  
  
export default router;