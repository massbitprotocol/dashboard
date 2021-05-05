import LoginModalComponent from './LoginModal.vue'

const LoginModal = {};

LoginModal.install = function (Vue) {
  const LoginModalConstructor = Vue.extend(LoginModalComponent)
  const instance = new LoginModalConstructor();

  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$loginModal = ( bool, accounts = [], el, callback ) => {
    instance.accounts = accounts;
    instance.loginModalShow = bool;
    instance.$t = ( info ) => {
     return el.$t(info)
    };

    instance.selectAction = ( account ) => {
      if ( callback && typeof ( callback ) == 'function' ) {
        callback(account);
      }
      instance.loginModalShow = false;
    };
    return instance
  }
}

export default LoginModal
