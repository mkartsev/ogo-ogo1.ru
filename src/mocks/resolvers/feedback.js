import { questionForm } from "./question.js"
import { callbackForm } from "./callback.js"
import { complainForm } from "./complain.js"

export const feedbackForm = `<ul class="nav nav-tabs" id="feedback-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="question-tab" data-bs-toggle="tab" data-bs-target="#question-tab-pane" type="button" role="tab" aria-controls="question-tab" aria-selected="false">Отправить вопрос</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="callback-tab" data-bs-toggle="tab" data-bs-target="#callback-tab-pane" type="button" role="tab" aria-controls="callback-tab-pane" aria-selected="false">Заказать звонок</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="complain-tab" data-bs-toggle="tab" data-bs-target="#complain-tab-pane" type="button" role="tab" aria-controls="complain-tab-pane" aria-selected="false">Пожаловаться</button>
  </li>
</ul>
<div class="tab-content" id="feedback-tabs-content">
  <div class="tab-pane fade" id="question-tab-pane" role="tabpanel" aria-labelledby="question-tab" tabindex="0">
    ${questionForm}
  </div>
  <div class="tab-pane fade" id="callback-tab-pane" role="tabpanel" aria-labelledby="callback-tab" tabindex="0">
    ${callbackForm}
  </div>
  <div class="tab-pane fade" id="complain-tab-pane" role="tabpanel" aria-labelledby="complain-tab" tabindex="0">
    ${complainForm}
  </div>
</div>`