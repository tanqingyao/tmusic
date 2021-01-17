import Toast from "./Toast";
//   模板相关的东西可能已经被转换为render函数
const obj = {};
obj.install = Vue => {
  //   console.log("安装了toast插件", Vue);
  //   Toast.$el还没有挂载
  //   document.body.appendChild(Toast.$el);
  //   直接赋值Toast还没有被渲染出来,没有添加到body
  //   Vue.prototype.$toast = Toast;
  //   console.log(Toast);
  //   1.创建组件构造器
  const ToastConstructor = Vue.extend(Toast);
  // 2.new方法,根据组件构造器,创建出一个组件对象
  const toast = new ToastConstructor();
  //   3.将组件对象手动挂载到元素上
  toast.$mount(document.createElement("div"));
  //   4.toast.$el就是对应的div
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
  //   console.log(toast);
};
export default obj;
