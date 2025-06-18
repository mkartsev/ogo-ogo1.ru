export const recoveryForm = `<form class="form form-recovery" id="form-recovery" action=${process.env.RECOVERY_URL} method="POST" data-reset="true">
  <input type="hidden" name="backurl" value="/ajax/new/forgot_password_popup.php">
  <input type="hidden" name="send_account_info" value="Выслать">
  <input type="hidden" name="AUTH_FORM" value="N">
  <input type="hidden" name="TYPE" value="SEND_PWD">
  <p class="form-error text-danger fw-bold" style="display: none"></p>
  <p>Введите E-mail, указанный при регистрации, и мы отправим ссылку для восстановления пароля.</p>
  <div class="field field--type-email mb-3">
    <label class="field__label" for="recovery-email">Электронная почта</label>
    <div class="field__field"><input class="form-control" type="email" id="recovery-email" name="USER_EMAIL" placeholder="Введите email" required="required"></div>
  </div>
  <button class="btn btn-primary" type="submit">Отправить</button>
</form>`

export const recoverySuccess = {
  "result": "ok",
  "message": "На ваш адрес выслано письмо с кодом подтверждения. Не забудьте проверить папку «спам»"
}
export const recoveryFail = {
  "result": "error",
  "error": "Вы еще не подтвердили регистрацию по email. На ваш адрес выслано повторное письмо с кодом подтверждения",
  "message": ""
}