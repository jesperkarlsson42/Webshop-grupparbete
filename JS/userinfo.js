class UserInfo {
    constructor(email, fname, lname, address, post, town) {
        this.email = email;
        this.fname = fname;
        this.lname = lname;
        this.address = address;
        this.post = post;
        this.town = town;
    }
} // create class to keep the user's value into one object

$(function() {
    $("#userform").on('submit', function(e) { // submit event
        e.preventDefault(); 

        let valueArray = $(this).serializeArray(); // Form as array
        // [ {name: 'email', value: 'info@info.se'}, {name: 'fname', value: 'Kani'} ]
        // need each object out from array form

        let valueObject = {}
        
        $.each(valueArray, (i, element) => {  
            valueObject[element.name] = element.value // Pick each key and value in array 
        })


        // LocalStorage 
        localStorage.setItem("user", JSON.stringify(valueObject))

        let valuesFromLS = localStorage.getItem("user")
        let userValue = JSON.parse(valuesFromLS);
        
        new UserInfo(valueObject.email, valueObject.fname, valueObject.lname, valueObject.address, valueObject.post, valueObject.town)
        //now valueObject is key and value from the 6 input, and create new object by sending all 6 inputs' key and value
    })
})