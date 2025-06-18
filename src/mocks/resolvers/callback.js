export const callbackForm = `<form class="form form-callback" id="form-callback" action=${process.env.CALLBACK_URL} method="POST" data-reset="true">
  <p class="form-error text-danger fw-bold" style="display: none"></p>
  <div class="row">
    <div class="col-12 col-lg-6">
      <div class="field field--type-text mb-3">
        <label class="field__label" for="callback-name">Имя</label>
        <div class="field__field"><input class="form-control" type="text" id="callback-name" name="name" placeholder="Ваше имя" required="required"></div>
      </div>
      <div class="field field--type-tel field--icon mb-3">
        <label class="field__label" for="callback-phone">
          Телефон
          <span class="js-tooltip field__tooltip" data-tooltip-content="Мы отправляем смс при начислении бонусов, но никогда не рассылаем смс-спам своим клиентам" data-tippy-placement="top">
            <span class="tooltip-icon badge rounded-pill bg-light">?</span>
          </span>
        </label>
        <div class="field__field">
          <input class="form-control" type="tel" id="callback-phone" name="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" data-rule-phone="true" required="required">
          <svg class="svg-icon field__icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--phone"></use></svg>
        </div>
      </div>
      <div class="field field--type-checkbox mb-3">
        <label class="field__label" for="callback-privacy">
          <input type="checkbox" id="callback-privacy" name="privacy" checked="checked" required="required">
          <span class="field__check"></span>
          <span class="field__caption">
            С
            <a href="#">политикой обработки и защиты персональных данных</a>
            ознакомлен и согласен
          </span>
        </label>
      </div>
      <button class="w-100 btn btn-primary" type="submit">Отправить</button>
    </div>
    <div class="col-12 col-lg-6"><div class="callout mt-4">Пожалуйста, представьтесь и оставьте ваш номер телефона, чтобы менеджер связался с вами по интересующему вопросу</div></div>
  </div>
</form>`

export const callbackSuccess = {
  "result": "ok",
  "message": "Наш гига-менеджер перезвонит вам в ближайшее время"
}
export const callbackFail = {
  "result": "error",
  "error": "Сможем перезвонить завтра с 10.00",
  "message": ""
}