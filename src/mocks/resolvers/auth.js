export const authForm = `<form class="form form-auth w-100 order-2" id="form-auth" action=${process.env.AUTH_URL} method="POST" data-reset="true">
<input type="hidden" name="AUTH_FORM" value="Y"/>
<input type="hidden" name="TYPE" value="AUTH"/>
<input type="hidden" name="POPUP_AUTH" value="Y"/>
<p class="form-error text-danger fw-bold" style="display: none"></p>
<div class="field field--type-email mb-3">
  <label class="field__label" for="auth-email">Электронная почта</label>
  <div class="field__field"><input class="form-control" type="email" id="auth-email" name="USER_LOGIN" placeholder="Введите email" required="required"></div>
</div>
<div class="field field--type-password mb-3">
  <label class="field__label" for="auth-password">Пароль</label>
  <div class="field__field">
    <input class="form-control" type="password" id="auth-password" name="USER_PASSWORD" placeholder="Введите пароль" autocomplete="autocomplete" required="required">
    <button class="btn field__show-password" type="button" title="Показать/Скрыть пароль">
      <svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--eye-close"></use></svg><svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--eye-open"></use></svg>
    </button>
  </div>
</div>
<button class="btn btn-primary w-100 mb-3" type="submit">Войти</button>
<p class="mb-4">
  Забыли пароль?
  <a href=${process.env.RECOVERY_URL} class="js-recovery-popup">Восстановить</a>
</p>
<p><strong>Войти через социальные сети</strong></p>
<div class="social-buttons">
  <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/vk.svg" alt="vk"></a>
  <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/tg.svg" alt="telegram"></a>
  <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/google.svg" alt="google"></a>
  <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/tinkoffId.svg" alt="tinkoffId"></a>
  <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/yandex.svg" alt="yandex"></a>
</div>
</form>
<p class="mb-3 order-1">
Впервые у нас?
<a href=${process.env.REGISTRATION_URL} class="js-registration-popup">Зарегистрироваться</a>
</p>`

export const authSuccess = {
  "result": "ok",
  "message": ""
}
export const authFail = {
  "result": "error",
  "error": "Не верный логин или пароль",
  "message": ""
}