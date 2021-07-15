let input = document.querySelector("#input"),
    
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




                console.log(data);
            })
            .catch(() => {
                console.log("An issue Occurred!!!")
            });

    };

});