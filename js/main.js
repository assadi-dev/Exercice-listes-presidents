$(document).ready(() => {
  //const urlData = location.protocol + location.host + "/";

  const generatePicture = (data, i) => {
    const { nom, photo, mandat } = data;
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    $(figcaption).addClass("card-content");
    let cardImage = document.createElement("div");
    $(cardImage).addClass("card-image");
    $(figure).addClass("card white rounded-2 shadow-1 mx-auto hidden");
    $(figcaption).append(`<p> <strong>Nom: </strong>${nom} </p>`);
    $(figcaption).append(
      `<p> <strong>mandat: </strong> de: ${mandat[0].debut} à ${mandat[0].fin} </p>`
    );

    $(img).attr({
      src: photo,
      alt: nom,
    });
    $(img).appendTo(cardImage);
    $(cardImage).prependTo(figure);
    $(figcaption).appendTo(figure);
    $(figure)
      .addClass("hidden")
      .css({ "animation-delay": `${(i + 1) * 550}ms` });
    return figure;
  };

  $("#show").on("click", function (e) {
    fetch("../data/presidents.json")
      .then((res) => res.json())
      .then((res) => {
        res.map((data, i) => {
          let li = document.createElement("li");
          setTimeout(() => {
            let card = generatePicture(data, i);
            $(card).addClass("apparition");
            $(card).appendTo(li);
            $(li).appendTo("#presidents-list");
          }, 500);
        });
      });
    $(this).attr({
      disabled: true,
    });
  });

  //Footer
  const currentDate = new Date().getFullYear();
  $("footer").html(`<p>&copy; - JS - ${currentDate}</p>`);
  $("footer p").wrapInner("<time></time>");
  $("time").attr({
    datetime: `${currentDate}`,
  });
});
