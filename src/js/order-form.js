function orderForm() {

  // удаление всех ненужных элементов при взаимодействии со страницей

  document.addEventListener("click", () => {
    if (document.querySelector(".js_error_message")) document.querySelector(".js_error_message").remove();
  })
  document.addEventListener("touchstart", () => {
    if (document.querySelector(".js_error_message")) document.querySelector(".js_error_message").remove();
  })
  document.addEventListener("scroll", () => {
    if (document.querySelector(".js_error_message")) document.querySelector(".js_error_message").remove();
  })
  // document.addEventListener("keyup", () => {
  //   if (document.querySelector(".js_error_message")) document.querySelector(".js_error_message").remove();
  // })
  document.addEventListener("resize", () => {
    if (document.querySelector(".js_error_message")) document.querySelector(".js_error_message").remove();
  })

  // проверка формы
  var
    form = document.querySelector(".order-form"),
    bul = false,
    param = "",
    block = document.querySelector(".for_textarea");



  // МАСКА ТЕЛЕФОНА

  // при помощи метода выделения текста в полях ввода текста ставим курсор в нужное положение
  // для маски телефона
  function setCursorPosition(pos, elem) {
    elem.focus();
    elem.setSelectionRange(pos, pos);
  }

  function mask(event) {
    // маску получу из placeholder
    var matrix = input.placeholder,
      i = 0,
      // все буквенные символы заменяем на пустую строку
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");

    // выравниваем количество символов в маске по введенному количеству символов
    if (def.length >= val.length) val = def;

    // тут сравниваем последний введенный символ и сравниваем с маской.
    this.value = matrix.replace(/./g, function (a) {
      // все знаки "_" заменяем на цыфры, другие сиволы уже отсеяли
      // далее заменяем все по маске
      // return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
      var b = "";

      if (/[_\d]/.test(a) && i < val.length) {
        b = val.charAt(i++);
      } else if (!(i >= val.length && a)) {
        b = a;
      }


      return b;
    });
    // если потеряли фокус
    if (event.type == "blur") {
      // если только два символа то чистим поле
      if (this.value.length == 2) this.value = ""
      // либо ставим курсор в нужное положение
    } else setCursorPosition(this.value.length, this)
  };


  var input = document.querySelector("[name='tel']");
  // при вводе номера 
  input.addEventListener("input", mask, false);
  // при событии фокуса
  input.addEventListener("focus", mask, false);
  // при потери фокуса
  input.addEventListener("blur", mask, false);

  document.querySelector("[name='review']").addEventListener("keyup", function () {

    var val_text = document.querySelector("[name='review']").value;

    val_text = val_text.replace(/ /g, "&nbsp;");
    val_text = val_text.replace(/<|>/g, "_");

    block.innerHTML = val_text
    var height_textarea = block.offsetHeight;
    document.querySelector("[name='review']").style.height = height_textarea + "px";

    document.querySelector(".contact__btn").disabled = false;
    if (document.querySelector(".js_error_message")) document.querySelector(".js_error_message").remove();

    if (/href=/.test(document.querySelector("[name='review']").value) || /www./.test(document.querySelector("[name='review']").value) || /http/.test(document.querySelector("[name='review']").value)) {
      error_message(document.querySelector("[name='review']"), "Вы пытаетесь добавить ссылку?");
      document.querySelector(".contact__btn").disabled = true;
    }

  })

  // вывод ошибки
  function error_message(err_el, error_text) {

    var coord = err_el.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    var error_message = document.createElement("div");
    error_message.classList.add("js_error_message");
    error_message.innerText = error_text;
    error_message.style.top = (coord.y + scrollTop) - 25 + "px"
    error_message.style.left = coord.x + "px";
    return document.body.append(error_message), err_el.focus();
  }
  // \вывод ошибки

  // \проверка формы


  form.onsubmit = function () {

    if (document.querySelector("[name='name']").value) {
      bul = true;
      param += "name=" + document.querySelector("[name='name']").value;
    } else {
      error_message(document.querySelector("[name='name']"), "Вы не ввели свое имя!");
      return false;
    }

    if (document.querySelector("[name='tel']").value) {
      bul = true;
      param += "&tel=" + document.querySelector("[name='tel']").value;
    } else {
      error_message(document.querySelector("[name='tel']"), "Вы не ввели номер телефона!");
      return false;
    }

    if (document.querySelector("[name='email']").value) {
      bul = true;
      param += "&email=" + document.querySelector("[name='email']").value;
    } else {
      error_message(document.querySelector("[name='email']"), "Вы не ввели свой email!");
      return false;
    }

    if (document.querySelector("[name='review']").value) {
      bul = true;
      param += "&review=" + document.querySelector("[name='review']").value;
    } else {
      error_message(document.querySelector("[name='review']"), "Вы не ввели текст комментария!");
      return false;
    }

    // отправка данных
    if (bul == true) {

      var xhr = new XMLHttpRequest();

      xhr.open('POST', './wp-content/themes/notesdeveloper/template-parts/order-form.php', true);

      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.send(param);

      xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status != 200) {
          // обработать ошибку
          document.querySelector(".contact__btn").innerHTML = 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался');
          return;
        }

        document.querySelector(".contact__btn").innerHTML = this.responseText;
      }

      document.querySelector(".contact__btn").innerHTML = 'Загружаю...'; // (2)
      document.querySelector(".contact__btn").disabled = true;

    }
    // \отправка данных
    return false;
  }



















  // // получаем поле ввода и вспомогательный блок
  // var 
  //   textarea = document.querySelector("textarea"),
  //   block = document.querySelector(".for_textarea");
  //   // при нажатии на клавишу
  //   textarea.addEventListener("keyup", function() {
  //     // получаем значение поля ввода
  //     var val_text = textarea.value;
  //     // c помощью регулярных выражений заменм некоторые символы
  //     val_text = val_text.replace(/ /g, "&nbsp;");
  //     val_text = val_text.replace(/<|>/g, "_");
  //     // полученное выражение добавим в вспомогательный блок
  //     block.innerHTML = val_text;
  //     // получаем высоту вспомогательного блока
  //     height_textarea = block.offsetHeight;

  //     // задаем высоту для текстового поля
  //     textarea.style.height = height_textarea + "px";
  //   })
}