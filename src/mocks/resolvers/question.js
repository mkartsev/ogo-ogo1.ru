export const questionForm = `<form class="form form-question" id="form-question" action=${process.env.QUESTION_URL} method="POST" data-reset="true">
  <p class="form-error text-danger fw-bold" style="display: none"></p>
  <div class="row mb-3">
    <div class="col">
      <div class="field field--type-select">
        <label class="field__label" for="question-theme">Тема сообщения</label>
        <div class="field__field">
          <select class="js-select" id="question-theme" name="theme" required="required">
            <option value="" disabled="" selected="" hidden="">Тема сообщения</option>
            <option value="5">Задать вопрос о товаре</option>
            <option value="3">Предложение о поставке товара</option>
            <option value="2">Рекламное предложение</option>
            <option value="11">Обратный звонок</option>
            <option value="1">О магазине</option>
            <option value="53">Информация о соискателе от работодателя</option>
            <option value="6">Сообщить об ошибке</option>
            <option value="26">Пожаловаться</option>
            <option value="4">Работа в ОГО!</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-12 col-lg-6">
      <div class="field field--type-text mb-3">
        <label class="field__label" for="question-name">Имя</label>
        <div class="field__field"><input class="form-control" type="text" id="question-name" name="name" placeholder="Ваше имя" required="required"></div>
      </div>
      <div class="field field--type-tel field--icon mb-3">
        <label class="field__label" for="question-phone">
          Телефон
          <span class="js-tooltip field__tooltip" data-tooltip-content="Мы отправляем смс при начислении бонусов, но никогда не рассылаем смс-спам своим клиентам" data-tippy-placement="top">
            <span class="tooltip-icon badge rounded-pill bg-light">?</span>
          </span>
        </label>
        <div class="field__field">
          <input class="form-control" type="tel" id="question-phone" name="phone" placeholder="+7 (___) ___-__-__" inputmode="tel" data-rule-phone="true" required="required">
          <svg class="svg-icon field__icon"><use xlink:href="/assets/img/sprites/sprite.svg#ui--phone"></use></svg>
        </div>
      </div>
      <div class="field field--type-email mb-3">
        <label class="field__label" for="question-email">Электронная почта</label>
        <div class="field__field"><input class="form-control" type="email" id="question-email" name=email" required="required"></div>
      </div>
    </div>
    <div class="col-12 col-lg-6"><div class="callout mt-4">Пожалуйста, представьтесь и оставьте ваш номер телефона, чтобы менеджер связался с вами</div></div>
  </div>
  <div class="row mb-3">
    <div class="col">
      <div class="field field--type-textarea">
        <label class="field__label" for="question-comment">Сообщение</label>
        <div class="field__field"><textarea class="form-control" rows="3" id="question-comment" name="comment" required="required"></textarea></div>
      </div>
    </div>
  </div>
  <div class="row mb-3">
    <div class="col">
      <div class="field field--type-checkbox">
        <label class="field__label" for="question-privacy">
          <input type="checkbox" id="question-privacy" name="privacy" checked="checked" required="required">
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
      <div class="field field--type-file field--button">
        <label class="field__label" for="question-file">Прикрепить файл</label>
        <div class="field__field"><input class="js-input-file" data-button-caption="Загрузить документ" type="file" name="file" id="question-file"></div>
      </div>
    </div>
    <div class="col-4"><button class="btn btn-primary w-100 mt-4" type="submit">Отправить</button></div>
  </div>
</form>`

export const questionSuccess = {
  "result": "ok",
  "message": "Ваш вопрос отправлен, наш гига-менеджер свяжется с вами в ближайшее время"
}
export const questionFail = {
  "result": "error",
  "error": "Ваш вопрос отправлен, но никто не знает ответ",
  "message": ""
}