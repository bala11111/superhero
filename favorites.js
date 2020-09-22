
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    var favoriteList = document.getElementById("favorite-list");

    //function to fetch the favorites
    function favlist()
    {
       if(favorites==null || favorites.length==0)
       {
         favoriteList.innerHTML = `
         <h2>You don't have any favourites yet :( </h2>
         `
       }
       else{
         favoriteList.innerHTML = "";
         for(let i=0;i<favorites.length;i++)
         {
           fetch(`https://superheroapi.com/api.php/2763764547062017/${favorites[i]}`)
            .then((response) => response.json())
            .then((data) => createItem(data))
            .catch((err) => console.log(err));
         }
       }
    }


    //function to create the hero card div
    function createItem(data)
    {
      var hero = document.createElement("div");
      hero.setAttribute("id",data.id);
      hero.classList.add("hero-card");
      hero.style.backgroundImage = `url(${data.image.url})`;
      hero.innerHTML = `
          <div id="favy" class="black-layer">
              <div>
                  <i class="fas fa-heart" id="love-img">
                  </i>
              </div>
              <span class="hero-card-name" id="hero-name">
                  ${data.name}
              </span>
          </div>
      `;
      hero.classList.add("fav-card");
      favoriteList.appendChild(hero);
    }


    //function to handle the click events
    function clickevent(e){
      if(e.target.classList.contains("fas"))
      {
        var index = favorites.indexOf(e.target.parentNode.parentNode.id);
        favorites.splice(index,1);
        e.target.parentNode.parentNode.parentNode.remove();
      }
      else if(e.target.classList.contains("black-layer"))
      {
        window.open("superhero.html?id=" + e.target.parentNode.id, "_self");
      }else if(e.target.classList.contains("hero-card-name")){
        window.open("superhero.html?id=" + e.target.parentNode.parentNode.id,"_self");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      if(favorites.length==0)
      {
        favlist();
      }
    }
  
  
    function favoriteHero(){
      favlist();
      document.addEventListener("click", clickevent);
    }
  
    favoriteHero();