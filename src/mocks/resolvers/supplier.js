export const supplierForm = `<form class="form form-supplier" id="form-supplier" action=${process.env.SUPPLIER_URL} method="POST" data-reset="true">
  <p class="form-error text-danger fw-bold" style="display: none"></p>
  <div class="field field--type-text mb-3">
    <label class="field__label" for="supplier-company">Компания</label>
    <div class="field__field"><input class="form-control" type="text" id="supplier-company" name="company" placeholder="Ваше имя" required="required"></div>
  </div>
  <div class="field field--type-text mb-3">
    <label class="field__label" for="supplier-name">Имя</label>
    <div class="field__field"><input class="form-control" type="text" id="supplier-name" name="name" placeholder="Ваше имя" required="required"></div>
  </div>
  <div class="field field--type-tel field--icon mb-3">
    <label class="field__label" for="supplier-phone">
      Телефон / WhatsApp
      <span class="js-tooltip field__tooltip" data-tooltip-content="Мы отправляем смс при начислении бонусов, но никогда не рассылаем смс-спам своим клиентам" data-tippy-placement="top">
        <span class="tooltip-icon badge rounded-pill bg-light">?</span>
      </span>
    </label>
    <div class="field__field">
      <input class="form-control" type="tel" id="supplier-phone" name="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" required="required" data-rule-phoneint="true">
      <svg class="svg-icon field__icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--phone"></use></svg>
    </div>
  </div>
  <div class="field field--type-email mb-3">
    <label class="field__label" for="supplier-email">Электронная почта</label>
    <div class="field__field"><input class="form-control" type="email" id="supplier-email" name="email" required="required"></div>
  </div>
  <div class="field field--type-textarea mb-3">
    <label class="field__label" for="supplier-comment">Сообщение</label>
    <div class="field__field"><textarea class="form-control" rows="3" id="supplier-comment" name="comment" required="required"></textarea></div>
  </div>
  <div class="field field--type-checkbox mb-3">
    <label class="field__label">
      <input type="checkbox" name="question-agree" checked="checked" required="required" id="field-a11lfynd8">
      <span class="field__check"></span>
      <span class="field__caption">
        С
        <a href="#">политикой обработки и защиты персональных данных</a>
        ознакомлен и согласен
      </span>
    </label>
  </div>
  <button class="btn btn-primary w-100" type="submit">Отправить</button>
</form>`

export const supplierSuccess = {
  "result": "ok",
  "message": "Cообщение успешно отправлено"
}
export const supplierFail = {
  "result": "error",
  "error": "Cообщение отправлено, но гига-менеджер в отпуске и не увидит его",
  "message": ""
}