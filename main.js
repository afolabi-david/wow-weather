let input = document.querySelector("#input"),
    list_items = document.querySelector(".listItems"),
    pop = document.querySelector("#pop"),
    date = new Date(),
    days_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    months_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    year = date.getFullYear(),
    day = date.getDay(),
    month = date.getMonth(),
    day_date = date.getDate();
   
 

input.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        input.blur(); 

        const apiKey = "4d8fb5b93d4af21d66a2948710284366";

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`)                                                                  
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`; 
              
                const flag = `http://openweathermap.org/images/flags/${sys.country}.png`;
                const img = flag.toLowerCase();
                
                let li = document.createElement("li");
                li.innerHTML = `
                    <li class="item">
                         <h2 style="color: var(--blue)">${name}, ${sys.country} <img src="${img}" style="height: 25px; width: 50px;" /></h2>
                         <span>${days_array[day]}, ${months_array[month]} ${day_date}, ${year}</span>
                         <h1 style="font-size: 65px; color: var(--blue)">${Math.round(main.temp)}<sup>°c</span></h1>
                         <img src="${icon}" style="height: 90px; width: 90px" alt="icon" />
                         <p style="text-transform: uppercase; color: var(--blue); font-size: 18px;">${weather[0]["description"]}.</p>
                    </li>
                `
                list_items.appendChild(li);
                input.value = ''
                li.ondblclick = ()=>{
                    list_items.removeChild(li);
                    showPop("ITEM <br> DELETED.", 3000);
                };
                
 
            })
            .catch(() => {
                showPop("Ouch!, Abeg search for a valid city !!!.", 5000)
            });

    };

});

function showPop(message, time) {
    
    pop.style.display = "block";
    pop.innerHTML = `<h1 class="message">${message}</h1>`
    setTimeout(()=>{
        pop.style.display = "none";
    }, time)
};

showPop("double click items to delete", 4000); 
