/* Sticky Navigation */
$(function () {

  var sticky = $('.sticky');
  var contentOffset;

  if (sticky.length) {

    if (sticky.data('offset')) {
      contentOffset = sticky.data('offset');
    } else {
      contentOffset = sticky.offset().top;
    }
    nav_height = sticky.height();
  }

  var scrollTop = $(window).scrollTop();
  var window_height = $(window).height();
  var doc_height = $(document).height();

  $(window).bind('resize', function () {
    scrollTop = $(window).scrollTop();
    window_height = $(window).height();
    doc_height = $(document).height();
    navHeight();
  });

  $(window).bind('scroll', function () {
    stickyNav();
  });

  function navHeight() {
    sticky.css('max-height', window_height + 'px');
  }

  function stickyNav() {
    scrollTop = $(window).scrollTop();
    if (scrollTop > contentOffset) {
      sticky.addClass('fixed');
    } else {
      sticky.removeClass('fixed');
    }
  }

});

$('document').ready(function () {
  var nav_height = 70;

  $("a[data-role='smoothscroll']").click(function (e) {
    e.preventDefault();

    var position = $($(this).attr("href")).offset().top - nav_height;

    $("body, html").animate({
      scrollTop: position
    }, 1000);
    return false;
  });
});

$('document').ready(function () {

  // Loader
  $(window).on('load', function () {
    $('.loader-container').fadeOut();
  });

  // Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Popovers
  $('[data-toggle="popover"]').popover();

  // Page scroll animate
  new WOW().init();
});

//======================================= ToDos =================================
const form_todo = document.querySelector('#td-form');
const input_todo = document.querySelector('#td-input');
const tbody_todo = document.getElementById('td-items').getElementsByTagName('tbody')[0];
let todos = [];

form_todo.addEventListener('submit', function (event) {
  event.preventDefault();
  tambah_aktivitas(input_todo.value);
});

function tambah_aktivitas(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todos.push(todo);
    simpan_ke_localstorage(todos);
    input_todo.value = '';
  }
}

function show_aktivitas(todos) {
  tbody_todo.innerHTML = `<tr>
    <td colspan="4" style="text-align:center;">Data Not Found</td>
  </tr>`;
  if (todos.length > 0) {
    tbody_todo.innerHTML = ``;
    todos.forEach(function (item) {
      const tr = tbody_todo.insertRow();;
      tr.setAttribute('class', 'item');
      tr.setAttribute('data-key', item.id);
      if (item.completed === true) {
        tr.classList.add('checked');
      }
      tr.innerHTML = `
        <td>${tampilTanggal}</td>
        <td>${item.name}</td>
        <td><button class="delete-button">Hapus Aktivitas</button></td>
      `;
      tbody_todo.appendChild(tr);
    });
  }
}

function simpan_ke_localstorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  show_aktivitas(todos);
}

function get_From_LocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    show_aktivitas(todos);
  }
}

function toggle(id) {
  console.log(id)
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  simpan_ke_localstorage(todos);
}

function hapus_aktivitas(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  simpan_ke_localstorage(todos);
}

get_From_LocalStorage();

tbody_todo.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.parentElement.dataset.key);
  }

  if (event.target.classList.contains('delete-button')) {
    hapus_aktivitas(event.target.parentElement.parentElement.dataset.key);
  }
});

// ===================================== Tampil Tanggal =================================
var date = new Date();
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
switch (hari) {
  case 0:
    hari = "Minggu";
    break;
  case 1:
    hari = "Senin";
    break;
  case 2:
    hari = "Selasa";
    break;
  case 3:
    hari = "Rabu";
    break;
  case 4:
    hari = "Kamis";
    break;
  case 5:
    hari = "Jum'at";
    break;
  case 6:
    hari = "Sabtu";
    break;
}
switch (bulan) {
  case 0:
    bulan = "Januari";
    break;
  case 1:
    bulan = "Februari";
    break;
  case 2:
    bulan = "Maret";
    break;
  case 3:
    bulan = "April";
    break;
  case 4:
    bulan = "Mei";
    break;
  case 5:
    bulan = "Juni";
    break;
  case 6:
    bulan = "Juli";
    break;
  case 7:
    bulan = "Agustus";
    break;
  case 8:
    bulan = "September";
    break;
  case 9:
    bulan = "Oktober";
    break;
  case 10:
    bulan = "November";
    break;
  case 11:
    bulan = "Desember";
    break;
}
var tampilTanggal = hari + ", " + tanggal + " " + bulan + " " + tahun;