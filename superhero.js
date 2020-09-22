
    let param = new URLSearchParams(window.location.search);
    const id = param.get("id");
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    var heroname = document.getElementById("superhero-name");
    var heroimg = document.getElementById("superhero-image");
    var powers = document.getElementById("powerstats");

    //function to create the hero details with img
    function createData(data)
    {
      heroimg.innerHTML = `<img src=${data.image.url} alt="not found" id="sup-img"/>`;
      heroname.innerHTML = `<span>${data.name}</span>`
      var favicon = document.createElement("i");
      favicon.style.cursor = "pointer";
      favicon.classList.add("fa-heart");
      if(favorites.includes(data.id))
      {
        favicon.classList.add("fas");
      }
      else{
        favicon.classList.add("far");
      }
      favicon.classList.add("love-img")
      heroname.appendChild(favicon);
      ShowPower(data);
    }
  

    // for retreiving power stats
    function ShowPower(data)
    {
      for(const [key,value] of Object.entries(data.powerstats))
      {
        let pow = document.createElement("p");
        pow.innerHTML = `<span>${key}:</span><span>${value}</span>`;
        powers.appendChild(pow);
      }
    }

    //fetching the stats
    function GetPower(){
      fetch(`https://superheroapi.com/api.php/2763764547062017/${id}`)
        .then((response) => response.json())
        .then((data) => createData(data))
        .catch((err) => console.log(err));
    }

    //handle the click events
    function clickevent(e){
      if(e.target.classList.contains("fas")){
        var index = favorites.indexOf(id);
        favorites.splice(index,1);
        e.target.classList.remove("fas");
        e.target.classList.add("far");
      }else if(e.target.classList.contains("far")){
        favorites.push(id);
        e.target.classList.remove("far");
        e.target.classList.add("fas");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  
  
    function Superhero(){
      GetPower()
      document.addEventListener("click", clickevent);
    }
  
    Superhero();