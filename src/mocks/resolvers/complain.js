export const complainForm = `<form class="form form-complain" id="form-complain" action=${process.env.COMPLAIN_URL} method="POST" data-reset="true">
  <p class="form-error text-danger fw-bold" style="display: none"></p>
  <div class="row mb-3">
    <div class="col-12 col-lg-6">
      <div class="field field--type-text mb-3">
        <label class="field__label" for="complain-name">Имя</label>
        <div class="field__field"><input class="form-control" type="text" id="complain-name" name="name" placeholder="Ваше имя" required="required"></div>
      </div>
      <div class="field field--type-tel field--icon mb-3">
        <label class="field__label" for="complain-phone">
          Телефон
          <span class="js-tooltip field__tooltip" data-tooltip-content="Мы отправляем смс при начислении бонусов, но никогда не рассылаем смс-спам своим клиентам" data-tippy-placement="top">
            <span class="tooltip-icon badge rounded-pill bg-light">?</span>
          </span>
        </label>
        <div class="field__field">
          <input class="form-control" type="tel" id="complain-phone" name="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" data-rule-phone="true" required="required">
          <svg class="svg-icon field__icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--phone"></use></svg>
        </div>
      </div>
      <div class="field field--type-email mb-3">
        <label class="field__label" for="complain-email">Электронная почта</label>
        <div class="field__field"><input class="form-control" type="email" id="complain-email" name="email" placeholder="Введите email" required="required"></div>
      </div>
    </div>
    <div class="col-12 col-lg-6"><div class="callout mt-4">Пожалуйста, представьтесь и оставьте ваш номер телефона, чтобы менеджер связался с вами по интересующему вопросу</div></div>
  </div>
  <div class="row mb-3">
    <div class="col">
      <div class="field field--type-textarea">
        <label class="field__label" for="complain-comment">Сообщение</label>
        <div class="field__field"><textarea class="form-control" rows="3" id="complain-comment" name="comment" required="required"></textarea></div>
      </div>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col">
      <div class="field field--type-checkbox">
        <label class="field__label" id="complain-privacy">
          <input type="checkbox" id="complain-privacy" name="privacy" checked="checked" required="required">
          <span class="field__check"></span>
          <span class="field__caption">
            С
            <a href="#">политикой обработки и защиты персональных данных</a>
            ознакомлен и согласен
          </span>
        </label>
      </div>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-8">
      <div class="field field--type-file">
        <label class="field__label" for="complain-file">Прикрепить файл</label>
        <div class="field__field"><input class="js-input-file" type="file" id="complain-file" name="complain-file"></div>
      </div>
    </div>
    <div class="col-4"><button class="btn btn-primary w-100 mt-4" type="submit">Отправить</button></div>
  </div>
</form>`

export const complainSuccess = {
  "result": "ok",
  "message": "Ваша жалоба принята, наш гига-менеджер свяжется с вами в ближайшее время с ответом"
}
export const complainFail = {
  "result": "error",
  "error": "Жалоба принята, но смотреть не будем",
  "message": ""
}