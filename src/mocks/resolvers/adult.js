export const adultForm = `<form class="form form-adult" id="form-adult" action=${process.env.ADULT_CONFIRM_URL} method="POST">
<p class="form-error text-danger fw-bold" style="display: none"></p>
<input type="hidden" name="CONFIRM_ADULT" value="true">
<p class="text-center text-primary display-3">
  <svg class="svg-icon" style="width: 1.5em; height: 1.5em"><use xlink:href="/assets/img/sprites/sprite.svg#ui--adult"></use></svg>
</p>
<p class="fs-3">Данный раздел предназначен только для посетителей, достигших возраста 18 лет!</p>
<div>
<button type="button" class="btn btn-primary js-adult-confirm">Да, мне есть 18 лет</button>
<button type="button" class="btn btn-secondary js-adult-notconfirm">Нет, я младше</button>
</div>
</form>`

export const adultSuccess = {
  result: "ok"
}

export const adultFail = {
  result: "error",
  message: "Пользователь младше 18 лет"
}