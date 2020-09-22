
    var searchList = document.getElementById("search-list");//The list heros with typed name
    var searchItem = document.getElementById("search-box");// The search box
  
    let favorites = JSON.parse(localStorage.getItem("favorites"));// favorites stored in Local Storage
    if(favorites == null)
    {
      favorites = [];
    }

    //function to fetch the herors with the typed name
    function addsearchData(name){
      fetch(
        `https://superheroapi.com/api.php/2763764547062017/search/${name}`
      )
       .then((response) => response.json())
       .then((data)=> {
          searchList.innerHTML = "";
          const heroes = data.results.filter((hero) => {
            return hero.name.toLowerCase().startsWith(name.toLowerCase());
          });
          for(let i=0;i<heroes.length;i++)
          {
            searchData(heroes[i]);
          }
       }).catch((err) => console.log(err));
      }
      
     //function to create the list in search list 
     function searchData(data)
    {
       var lst = document.createElement("li");
       var fav = document.createElement("button");
       if(favorites.includes(data.id))
       {
         fav.innerHTML = "Remove from favorites";
         fav.classList.add("danger");
       }else{
         fav.innerHTML = "Add to favorites";
         fav.classList.add("success");
       }

       lst.setAttribute("id",data.id);
       lst.innerHTML = `
       
       <img src=${data.image.url} alt="not found" class="hero-image" /> 
       <h2 id="broo">${data.name}</h2>
       
       `;

       fav.classList.add("bro");
       lst.classList.add("hero-details");
       lst.appendChild(fav);
       searchList.appendChild(lst);
    }

    //function to handle click events
    function clickevent(e)
    {
      if(e.target.tagName === "BUTTON")
      {
        if(e.target.classList.contains("success")){

          favorites.push(e.target.parentNode.id);
          e.target.innerHTML = "Remove from Favorites";
          e.target.style.backgroundColor = "rgb(189, 44, 33)";
          e.target.classList.remove("success");
          e.target.classList.add("danger");

        }else if(e.target.classList.contains("danger")){

          var index = favorites.indexOf(e.target.parentNode.id);
          favorites.splice(index,1);
          e.target.innerHTML = "Add to Favorites";
          e.target.style.backgroundColor = "rgb(36, 180, 23)";
          e.target.classList.remove("danger");
          e.target.classList.add("success");

        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
      else if (e.target.tagName === "LI") {
        if (e.target.classList.contains("hero-details")) {
          console.log(e.target.id);
          window.open("superhero.html?id=" + e.target.id, "_self");
        }
      }
    }
  

    function home()
    {
      searchItem.addEventListener("keyup", () =>
      addsearchData(searchItem.value)
      );
      document.addEventListener("click", clickevent);
    }
  
    home();