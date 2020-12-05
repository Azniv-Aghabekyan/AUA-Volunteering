/// loadExistingData 

function loadExistingData(){
    volunteeringInfo = JSON.parse(window.localStorage.getItem("volunteeringInfo"));
    if (volunteeringInfo && volunteeringInfo.length > 0 ) {
        volunteeringInfo = volunteeringInfo[0]
        document.getElementById("fname").value = volunteeringInfo.firstName;
        document.getElementById("lname").value = volunteeringInfo.lastName;
        document.getElementById("email").value = volunteeringInfo.email;
        document.getElementById("phone").value = volunteeringInfo.phone;
        document.getElementById("selected-age").value = volunteeringInfo.age;
        document.getElementById("free-time").value = volunteeringInfo.freeTime;
	    document.getElementById("other-skills").value = volunteeringInfo.otherSkills;

        document.getElementById("selected-country").value = volunteeringInfo.country;
        if (document.getElementById("selected-country").value == "") {
            document.getElementById("selected-country").value = "Other";
            document.getElementById("other-location").value = volunteeringInfo.country;
        }

        var genderOptions = document.getElementsByName("gender");
        for (var i = 0; i < genderOptions.length; i++) {
            if (genderOptions[i].value == volunteeringInfo.gender) {
                genderOptions[i].checked = true;
                break;
            }
        }

        var checkbox = document.getElementsByClassName("skill");
		for (var i = 0; i < checkbox.length; i++) {
			if( volunteeringInfo.skill.includes(checkbox[i].value)){
				checkbox[i].checked = true
				var index = volunteeringInfo.skill.indexOf(checkbox[i].value)
				volunteeringInfo.skill.splice(index, 0);
	
			}
		}
    }
    handleSkillChange();
    handleLocationChange();
}

/// checkFunction

function checkFunction(){

    var volunteeringInfo = {
        "firstName" : "",
        "lastName" : "",
        "email" : "",
        "phone" : "",
        "gender" : "",
        "age" : "",
        "country" : "",
        "freeTime" : "",
        "skill" : [],
        "otherSkills" : "",
    }
    var fname = document.getElementById("fname").value;
    volunteeringInfo.firstName = fname;

    var lname = document.getElementById("lname").value;
    volunteeringInfo.lastName = lname;

    var email = document.getElementById("email").value;
    volunteeringInfo.email = email;

    var phone = document.getElementById("phone").value;
    volunteeringInfo.phone = phone;
    
    var otherLocation = document.getElementById("other-location");
	if (country == "Other" && otherLocation != "") {
		volunteeringInfo.country = otherLocation;
	} 

    var genderOptions = document.getElementsByName("gender");
    volunteeringInfo.gender = "";
    for (var i = 0; i < genderOptions.length; i++) {
        if (genderOptions[i].checked == true) {
            volunteeringInfo.gender = genderOptions[i].value;
            break;
        }
    }

    var age = document.getElementById("selected-age").value;
    volunteeringInfo.age = age;

    var country = document.getElementById("selected-country").value;
    var otherCountry = document.getElementById("other-location").value;
    if (country == "Other") {
        volunteeringInfo.country = otherCountry;
    } else {
        volunteeringInfo.country = country;
    }

    var freeTime = document.getElementById("free-time").value;
    volunteeringInfo.freeTime = freeTime;


    var checkbox = document.getElementsByClassName("skill");
	var allCheckedItems =[];
	for (var i = 0; i < checkbox.length; i++) {
		if( checkbox[i].checked == true){
			if (checkbox[i].value == "Other") {
				volunteeringInfo.otherSkills = document.getElementById('other-skills').value;
			} else {
				allCheckedItems.push(checkbox[i].value);
			}
		}
	}
    volunteeringInfo.skill = allCheckedItems;

    
    
    var formValid = true;

    if (volunteeringInfo.firstName == ""){
        console.log("The name cannot be empty");
        document.getElementById("fname_error").style.display = "block";
        document.getElementById("fname").style.backgroundColor= '#efbbcc';
        formValid = false;
    } else {
        document.getElementById("fname_error").style.display = "none";
        document.getElementById("fname").style.backgroundColor= '#fff';
    }

    if (volunteeringInfo.lastName == "") {
        console.log("The Surname cannot be empty");
        document.getElementById("lname_error").style.display = "block";
        document.getElementById("lname").style.backgroundColor= '#efbbcc';
        formValid = false;
    } else {
        document.getElementById("lname_error").style.display = "none";
        document.getElementById("lname").style.backgroundColor= '#fff';
    }

    if (volunteeringInfo.email == "") {
        console.log("The email cannot be empty");
        document.getElementById("email_error").style.display = "block";
        document.getElementById("email").style.backgroundColor= '#efbbcc';
        formValid = false;
    } else {
        document.getElementById("email_error").style.display = "none";
        document.getElementById("email").style.backgroundColor= '#fff';
    } 

    if (formValid == true) {
        $.ajax({
            type: 'POST',
            url: "/volunteer",
            data: volunteeringInfo,
            cache: false,
            dataType : 'json',
            success: function (data) {
                console.log("success");
                window.location.href = "thank_you.html";
            },
            error: function (xhr) {
                console.error("Error in post", xhr);
            },
            complete: function () {
                console.log("Complete");  
            }
        });
    }
}

/// handleSkillChange function

    function handleSkillChange(){
        if(document.getElementById('notlistedskill').checked == true) {
            document.getElementById("other-skills").style.display='block';
        } else { 
            document.getElementById("other-skills").style.display='none';
            document.getElementById('other-skills').value=""
        }
    }

///  handleLocationChange function

    function handleLocationChange() {
        if (document.getElementById('selected-country').value == "Other") {
            document.getElementById('otherLocationBox').style.display = "block";
        } else {
            document.getElementById('otherLocationBox').style.display = "none";
            document.getElementById('selected-country').value; 
        }
    }
   



// Admin code
function loadExistingVolunteers() {
    var volunteers = [];
    $.ajax({
        type : "GET",
        url : "/volunteers",
        dataType : "json",
        success : function(data) {
            volunteers = data.volunteers;
            for (var i = 0; i < volunteers.length; i++) {
                if (volunteers[i].firstName !=""){
                  document.getElementById("volunteersList").innerHTML += "<li onclick='showVolunteersInfo(event)'><div>" + volunteers[i].firstName + " " + volunteers[i].lastName + " </div> <div class='volunteeringDetails'>" + getVolunteersInfo(volunteers[i])+ "</div></li>";
                }
            }
        },
        error : function(data) {
            console.log("Error")
        }
    });
}

function getVolunteersInfo(item) {
    var innerHTML = "<span class='fullname'><span class='fieldTitle'>Full Name: </span>" + item.firstName + " " + item.lastName + "</span></br>";
    innerHTML += "<span class='phone'> <span class='fieldTitle'>Phone: </span>" + item.phone + "</span></br>";
    innerHTML += "<span class='email'><span class='fieldTitle'>EMAIL: </span>" + item.email + "</span></br>";
    innerHTML += "<span class='selected-age'> <span class='fieldTitle'> Age: </span>" + item.age + "</span></br>";
    innerHTML += "<span class='free-time'><span class='fieldTitle'> Free Time: </span>" + item.freeTime + "</span></br>";
    innerHTML += "<span class='selected-country'> <span class='fieldTitle'> Country: </span>" + item.country + "</span></br>";
    innerHTML += "<span class='gender'> <span class='fieldTitle'> Gender: </span>" + item.gender + "</span></br>";
    innerHTML += "<span class='skill'> <span class='fieldTitle'> Skills: </span>" + item.skill + "</span></br>";
    innerHTML += "<span class='otherSkills'><span class= fieldTitle'> Other Skills: </span>" + item.otherSkills + "</span></br>";
    return innerHTML;
}

/// showVolunteersInfo function

function showVolunteersInfo(e) {
    if (e.currentTarget.children[1].style.display == "block") {
        e.currentTarget.children[1].style.display = "none";
    } else {
        e.currentTarget.children[1].style.display = "block";
    }
}

function handleInputValidation(e, errorMessageBoxID) {
    console.log(e.target.value);
    if (e.target.value == "") {
        document.getElementById(errorMessageBoxID).style.display = "block";
        e.target.style.backgroundColor= '#efbbcc';
        formValid = false;
    } else {
        document.getElementById(errorMessageBoxID).style.display = "none";
        e.target.style.backgroundColor= '#fff';
    }
}

function showAll() {
    var volunteeringInfoBoxes = document.getElementsByClassName("volunteeringDetails");
    for (var i = 0; i < volunteeringInfoBoxes.length; i++) {
        volunteeringInfoBoxes[i].style.display = "block";
    }
}

function hideAll() {
    var volunteeringInfoBoxes = document.getElementsByClassName("volunteeringDetails");
    for (var i = 0; i < volunteeringInfoBoxes.length; i++) {
        volunteeringInfoBoxes[i].style.display = "none";
    }   
}