window.addEventListener("load", function() {
  $(".check")
    .on("focus", function() {
      $(this).addClass("focus");
    })
    .on("blur", function() {
      $(this).removeClass("focus");
    })
    .addClass("shadow")
    .prop("disabled", true)
    .fadeOut(500, function() {
      this.style.display = "block";
      this.style.opacity = 0.5;
    });

  $(".items .item")
    .on("click", function() {
      var item = $(this);

      console.log(item.css("color"));
      item.css("color", "#777");
    })
    .css({
      color: "#fff",
      background: "#f90",
      cursor: "pointer"
    })
    .attr("data-some", "1")
    .on("dblclick", function() {
      $(this).fadeOut(500);
    });
});
