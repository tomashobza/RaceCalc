document.querySelector('#saveBtn').addEventListener('click', () => {
    let data = {}; //competitor data
    let ready = true; //keeps track if every input if filled

    //Goes through every input, if it's not empty, it writes the value to data with is as a key
    document.querySelectorAll('#container input').forEach((e) => {
        if (e.value) {
            e.className = "inputOk";
            data[e.id] = e.value;
        } else {
            e.className = "inputBad";
            ready = false;
        }
    });

    if (ready) {
        //Sends the data to the server via fetch
        fetch('../add_competitor', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then(res=>res.json())
            .then(res => console.log(res));

        //Shows a "success" popup
        document.querySelector('div#successPopup div').className = "visible";
        setTimeout(() => {
            document.querySelector('div#successPopup div').className = "";
        }, 2000);

        //Clears input values
        document.querySelectorAll('#container input').forEach((e) => {
            e.className = "";
            e.value = "";
        });
    }
});