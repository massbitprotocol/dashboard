<template>
  <article
    class="login-container"
    v-if="loginModalShow"
    @click.self="loginModalShow = false"
  >
    <div class="account-list" v-if="accounts && accounts.length > 0">
      <!-- <img src="@/assets/img/banner/polka.jpg" width="100%" /> -->

      <img
        src="@//assets/img/logo/logo.svg"
        width="100%"
        style="padding:20px"
      />
      <h4>{{ $t("SelectAccount") }}</h4>
      <ul>
        <li
          v-for="(account, i) in accounts"
          :key="i"
          :class="{ active: account.isActive }"
          @click="selectAction(account)"
        >
          {{ account.address }} ({{ account.meta.name }})
        </li>
      </ul>
    </div>
    <div class="login-info" v-else>
      <img
        src="@/assets/img/icon/modal-close.png"
        width="18"
        class="modal-close"
        @click="loginModalShow = false"
      />
      <h2>{{ $t("Login") }}</h2>
      <p>{{ $t("SelectLoginAccount") }}</p>
      <a
        href="https://polkadot.js.org/extension/"
        target="_blank"
        rel="noopener noreferrer"
        class="btn bg-orange"
        @click="loginModalShow = false"
        ><img src="@/assets/img/logo/polka.png" width="24" />
        <span>{{ $t("LogInPolkadotJS") }}</span></a
      >
      <a
        href="https://mathwallet.org"
        target="_blank"
        rel="noopener noreferrer"
        class="btn"
        @click="loginModalShow = false"
        ><img src="@/assets/img/logo/math.png" width="24" />
        <span>{{ $t("LogInMathWallet") }}</span>
      </a>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      accounts: [],
      loginModalShow: false //登录弹窗是否显示
    };
  }
};
</script>
<style scoped>
.login-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: rgba(0, 0, 0, 0.3); */
  text-align: center;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container .modal-close {
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 10000;
  cursor: pointer;
}
.login-info {
  padding: 64px 32px;
  background: #fff;
  width: 100%;
  max-width: 480px;
  margin: auto;
  position: relative;
}

.login-container h2 {
  font: bold 24px/1.33 var(--familyMedium);
  margin-bottom: 8px;
  color: #000;
}
.login-info p {
  color: #000;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 48px;
}
.login-info .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  border-radius: 36px;
  margin-top: 16px;
  background: #000;
  font: bold 16px/24px var(--familyMedium);
  padding: 12px 28px;
  color: #fff;
}
.btn img {
  margin-right: 12px;
}
.account-list {
  background: #fff;
  text-align: left;
  max-width: 500px;
  overflow: hidden;
  border-radius: 15px;
  padding: 20px;
}
.account-list h4 {
  font: bold 16px/1.5 var(--familyMedium);
  color: #8a8a8f;
  padding: 32px 24px 0;
}
.account-list ul {
  padding: 0 24px 32px;
  max-height: calc(100vh - 300px);
  overflow: auto;
}
.account-list li {
  margin-top: 16px;
  border-radius: 8px;
  padding: 16px 42px 16px 16px;
  background: #efeff4 url("../../assets/img/icon/checkbox_off.png") no-repeat
    right 16px center/20px;
  color: #000;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
  cursor: pointer;
}
.account-list li.active {
  background-image: url("../../assets/img/icon/selected.png");
}
@media (max-width: 768px) {
  .login-container {
    left: 0;
    padding: 16px;
  }
}
</style>
