export const registrationForm = `<form class="form form-registration order-2" id="form-registration" action=${process.env.REGISTRATION_URL} method="POST" data-reset="true">
  <input type="hidden" name="REGISTER[LOGIN]" id="registration-login" />
  <p class="form-error text-danger fw-bold" style="display: none"></p>
  <div class="row">
    <div class="col">
      <div class="field field--type-email mb-3">
        <label class="field__label" for="registration-email">Электронная почта</label>
        <div class="field__field"><input class="form-control" type="email" id="registration-email" name="REGISTER[EMAIL]" placeholder="Введите email" required="required" data-sync-value-to="#registration-login" ></div>
      </div>
      <div class="field field--type-text mb-3">
        <label class="field__label" for="registration-name">Имя</label>
        <div class="field__field"><input class="form-control" type="text" id="registration-name" name="REGISTER[FIRST_NAME]" placeholder="Ваше имя" required="required"></div>
      </div>
      <div class="field field--type-text mb-3">
        <label class="field__label" for="registration-lastname">Фамилия</label>
        <div class="field__field"><input class="form-control" type="text" id="registration-lastname" name="REGISTER[LAST_NAME]" placeholder="Ваша фамилия" required="required"></div>
      </div>
      <div class="field field--type-tel field--icon mb-3">
        <label class="field__label" for="registration-phone">
          Телефон
          <span class="js-tooltip field__tooltip" data-tooltip-content="Мы отправляем смс при начислении бонусов, но никогда не рассылаем смс-спам своим клиентам" data-tippy-placement="top">
            <span class="tooltip-icon badge rounded-pill bg-light">?</span>
          </span>
        </label>
        <div class="field__field">
          <input class="form-control" type="tel" id="registration-phone" name="REGISTER[PERSONAL_PHONE]" placeholder="+7 (___) ___-__-__" inputmode="tel" data-rule-phone="true" required="required">
          <svg class="svg-icon field__icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--phone"></use></svg>
        </div>
      </div>
      <div class="field field--type-password mb-3">
        <label class="field__label" for="registration-password">Придумайте пароль</label>
        <div class="field__field">
          <input class="form-control" type="password" id="registration-password" name="REGISTER[PASSWORD]" autocomplete="autocomplete">
          <button class="btn field__show-password" type="button" title="Показать/Скрыть пароль">
            <svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--eye-close"></use></svg><svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--eye-open"></use></svg>
          </button>
        </div>
      </div>
      <div class="field field--type-password mb-3">
        <label class="field__label" for="registration-confirm-password">Повторите пароль</label>
        <div class="field__field">
          <input class="form-control" type="password" id="registration-confirm-password" name="REGISTER[CONFIRM_PASSWORD]" data-rule-equalto="#registration-password" autocomplete="autocomplete">
          <button class="btn field__show-password" type="button" title="Показать/Скрыть пароль">
            <svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--eye-close"></use></svg><svg class="svg-icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--eye-open"></use></svg>
          </button>
        </div>
      </div>
      <div class="field field--type-checkbox mb-3">
        <label class="field__label">
          <input type="checkbox" name="REGISTER[CONFIRM]" checked="checked" required="required" id="field-aom1y6lwm">
          <span class="field__check"></span>
          <span class="field__caption">
            Принимаю условия
            <a href="#">Публичной оферты</a>
          </span>
        </label>
      </div>
      <button class="btn btn-primary w-100" type="submit" name="register_submit_button" value="on">Зарегистрироваться</button>
    </div>
    <div class="col">
      <p><strong>Войти через социальные сети</strong></p>
      <div class="social-buttons mb-3">
        <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/vk.svg" alt="vk"></a>
        <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/tg.svg" alt="telegram"></a>
        <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/google.svg" alt="google"></a>
        <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/tinkoffId.svg" alt="tinkoffId"></a>
        <a class="social-button" href="#"><img class="social-button__img" src="/assets/img/icons/yandex.svg" alt="yandex"></a>
      </div>
      <div class="callout">
        <p class="h3">Обещаем, спама не будет!</p>
        <p>Мы рассылаем смс только о статусах заказов и изменениях бонусного счета. Мы не осуществляем рекламные смс-рассылки и не передаем телефоны наших клиентов третьим лицам.</p>
      </div>
    </div>
  </div>
</form>`

export const registrationSuccess = {
  "result": "ok",
  "message": "Вы успешно зарегистрировались"
}
export const registrationFail = {
  "result": "error",
  "error": "Не удалось создать аккаунт",
  "message": ""
}