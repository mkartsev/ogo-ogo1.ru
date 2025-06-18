export const fastBuyForm = `<form class="form form-fast-buy" id="form-fast-buy" action=${process.env.FAST_BUY_URL} method="POST" data-reset="true" novalidate>
<p class="form-error text-danger fw-bold" style="display: none"></p>
<input type="hidden" name="product" id="fast-buy-id" value="123456"/>
<div class="row">
  <div class="col-12 col-lg-6">
    <div class="field field--type-text mb-3">
      <label class="field__label" for="fast-buy-name">Имя</label>
      <div class="field__field"><input class="form-control" type="text" id="fast-buy-name" name="name" placeholder="Ваше имя" required="required" /></div>
    </div>
    <div class="field field--type-tel field--icon mb-3">
      <label class="field__label" for="fast-buy-phone">
        Телефон
        <span class="js-tooltip field__tooltip" data-tooltip-content="Мы отправляем смс при начислении бонусов, но никогда не рассылаем смс-спам своим клиентам" data-tippy-placement="top">
          <span class="tooltip-icon badge rounded-pill bg-light">?</span>
        </span>
      </label>
      <div class="field__field">
        <input class="form-control" type="tel" id="fast-buy-phone" name="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" data-rule-phone="true" required="required" />
        <svg class="svg-icon field__icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--phone"></use></svg>
      </div>
    </div>
    <div class="field field--type-checkbox mb-3">
      <label class="field__label">
        <input type="checkbox" id="fast-buy-privacy" name="privacy" checked="checked" required="required" />
        <span class="field__check"></span>
        <span class="field__caption">
          С
          <a href="/privacy.html">политикой обработки и защиты персональных данных</a>
          ознакомлен и согласен
        </span>
      </label>
    </div>
    <button class="w-100 btn btn-primary" type="submit">Отправить</button>
  </div>
  <div class="col-12 col-lg-6"><div class="callout mt-4">Пожалуйста, представьтесь и оставьте ваш номер телефона, чтобы менеджер связался с вами для оформления товара</div></div>
</div>
</form>`
export const fastBuySuccess = {
  "result": "ok",
  "message": "Заказ принят, наш гига-менеджер перезвонит вам в ближайшее время"
}
export const fastBuyFail = {
  "result": "error",
  "error": "Заказ конечно принят, но гига-менеджер в отпуске и не перезвонит",
  "message": ""
}