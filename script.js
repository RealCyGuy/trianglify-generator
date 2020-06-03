var s = new XMLSerializer();
function getcolours() {
  var colours = [];
  $(".colour").each(function () {
    colours.push($(this).val());
  });
  return colours;
}
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
function generate() {
  var pattern = Trianglify({
    width: parseInt($("#width").val()),
    height: parseInt($("#height").val()),
    cell_size: parseInt($("#cell").val()),
    variance: parseFloat($("#variance").val()),
    x_colors: shuffle(getcolours()),
  });
  $("canvas").last().replaceWith(pattern.canvas());
  $(".download-links").replaceWith(
    "<div class='download-links'><a href='data:image/svg+xml;utf-8," +
      s.serializeToString(pattern.svg()) +
      "' download='triangles'>svg</a><a href='" +
      pattern.png() +
      "' download='triangles'>png</a></div>"
  );
}

$(function () {
  var clipboard = new ClipboardJS(".copy", {
    text: function () {
      return window.location.href;
    },
  });
  clipboard.on("success", function (e) {
    $(".copy").text("Copied!");
    setTimeout(function() {
      $(".copy").text("Copy Link")
    }, 3000); 
  });

  clipboard.on("error", function (e) {
    prompt("Copy this to your clipboard.", window.location.href);
    $(".copy").text("Copied!");
    setTimeout(function() {
      $(".copy").text("Copy Link")
    }, 3000); 
  });
  generate();
  $("#form").change(generate);
  $("#regenerate").click(function (e) {
    e.preventDefault();
    generate();
  });
  $("#addcolour").click(function (e) {
    e.preventDefault();
    $(".colours").append(
      "<div class='colourinput'><input type='color' class='colour' value='" +
        $(".colour").last().val() +
        "'><button class='x'>X</button></div>"
    );
    generate();
    $(".x").click(function (e) {
      e.preventDefault();
      $(this).parent().remove();
      generate();
    });
  });
  $("#addrandomcolour").click(function (e) {
    e.preventDefault();
    $(".colours").append(
      "<div class='colourinput'><input type='color' class='colour' value='#" +
        Math.floor(Math.random() * 16777215).toString(16) +
        "'><button class='x'>X</button></div>"
    );
    generate();
    $(".x").click(function (e) {
      e.preventDefault();
      $(this).parent().remove();
      generate();
    });
  });
  $("#removeallcolour").click(function (e) {
    e.preventDefault();
    $(".colours").empty();
  });
  $("#exportcolour").click(function (e) {
    e.preventDefault();
    prompt("Copy this to your clipboard.", getcolours().toString());
  });
  $("#importcolour").click(function (e) {
    e.preventDefault();
    inputcolours = prompt(
      'Paste colours seperated by commas. Ex: "#cc2e5a,#9dead8" This will add onto the current colours.'
    ).split(",");
    inputcolours.forEach((colour) =>
      $(".colours").append(
        "<div class='colourinput'><input type='color' class='colour' value='#" +
          colour.replace("#", "") +
          "'><button class='x'>x</button></div>"
      )
    );
    generate();
  });
  $(".x").click(function (e) {
    e.preventDefault();
    $(this).parent().remove();
    generate();
  });
});
