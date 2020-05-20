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
  var colours = [];
  $(".colour").each(function () {
    colours.push($(this).val());
  });
  var pattern = Trianglify({
    width: parseInt($("#width").val()),
    height: parseInt($("#height").val()),
    cell_size: parseInt($("#cell").val()),
    x_colors: shuffle(colours)
  });
  $("canvas").last().replaceWith(pattern.canvas());
}

$(function () {
  generate();
  $("#form").change(generate);
  $("#addcolour").click(function (e) {
    e.preventDefault();
    $(".colours").append(
      "<div class='colourinput'><input type='color' class='colour' value='#" + Math.floor(Math.random()*16777215).toString(16) + "'><button class='x'>x</button></div>"
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
  })
  $(".x").click(function (e) {
    e.preventDefault();
    $(this).parent().remove();
    generate();
  });
});
