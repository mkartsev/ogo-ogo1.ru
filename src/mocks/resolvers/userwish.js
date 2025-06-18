export const userWishForm = `<form class="form form-user-wish w-100" id="form-user-wish" action=${process.env.USER_WISH_URL} method="POST" data-reset="true" novalidate="novalidate">
<input type="hidden" name="AJAX_TOKEN" value="1711465991:c3e6349e9a118453a36207cf7e343084">
<p class="form-error text-danger fw-bold" style="display: none"></p>
<div class="field field--type-textarea mb-3">
  <div class="field__field"><textarea class="form-control" rows="3" id="product-request" name="PRODUCT_REQUEST" required="required"></textarea></div>
</div>
<button class="btn btn btn-primary" type="submit"><span class="btn-text">Отправить</span></button>
</form>`

export const userWishSuccess = {
  "result": "ok",
  "message": "Постараемся расширить ассортимент в данной группе!"
}
export const userWishFail = {
  "result": "error",
  "error": "Пока не можем выполнить такое желание",
  "message": ""
}
