// Q1--- part 1

function get(url, callback) {
    fetch(url).then(function (response) {
        callback(response);
    });
}
 
const fetchCats = new Promise((resolve, reject) => {
    get("https://api.github.com/users/malnajar/repos", function (response) {
        if (response.status < 400) {
            resolve(console.log(response.text));
        } else {
            reject(data.error);
        }
    });
});

// here i pretented to use .then and .catch but the problem for me was how to catch the error since response.status = 400 is actually not 
// an error so i couldn't figure out how to split the two conditions between them(then and catch). 

//-----------------------------------------------------------------------------------------------------------------------------------------

// Q1--- part 2

const fetchDogs = fetch("https://api.github.com/users/mmm/repos")
    .then(function (resolve) {
        if (response.status < 400) {
            resolve(response.text);
        } else {
            reject(new Error("response.status is equel or greater than 400" + response.error))
        }
    })
// or in another way (which i think that it is better):

function handleErrors(response) {
    if (response.status >= 400) {
        throw Error(response.error);
    }
    return response;
}
const fetchDogs = fetch("blabla");
fetchDogs.then(handleErrors)
    .then(response => response.text)
    .catch(error => console.log(error));


//----------------------------------------------------------------------------------------------------------------------------------------

// Q3--- part 3
async function fetchAllAnimals(fetchCats, fetchDogs) {
    let results = await Promise.all([
        fetchCats,
        fetchDogs,
    ]);
    return results
}

// ---------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------

// Q2 
// to honest no magic here, we have done this hm earlier 

class Movies {
    constructor(title = null, establishedYear, writer) {
        this.title = title;
        this.establishedYear = establishedYear;
        this.stars = [];
        this.writer = writer;
        this.director = [];
        this.rating = [];
    }
    addStar(star) {
        this.stars.push(star)
    }
    getStars() {
        return this.stars
    }
    getWriter() {
        return this.writer
    }
    addDirector(director) {
        this.director.push(director)
    }
    getDirector() {
        return this.director
    }
    addRate(rating) {
        this.rating.push(rating)
    }
    getRating() {
        return this.rating
    }
    rate() {
        return this.rating.reduce((total, singleRate) => {
            return (total += singleRate) / this.rating.length;
        })
    }
}


class Staff {
    constructor(name, role, date_of_birth) {
        this.name = name;
        this.role = role;
        this.date_of_birth = new Date(date_of_birth)
    }
    getName() {
        return this.name
    }
    getRole() {
        return this.role
    }
    getAge() {
        return new Date().getFullYear() - this.date_of_birth.getFullYear()

    }

}
const Stan_Lee = new Staff("Stan Lee", "director", "1922-12-03")
const Scarlett_Johansson = new Staff("Scarlett Johansson", "actor", "1988-11-22")
const avengers = new Movies("Avengers", 2015, " Joss Whedon")
avengers.addRate(9);
avengers.addRate(8);
console.log(avengers.rate());
avengers.addStar(Scarlett_Johansson)
avengers.addDirector(Stan_Lee)
console.log(avengers.getStars().map(actor =>
    `${actor.getName()} ${actor.getAge()}`));
const director = avengers.getDirector();
console.log(director);
console.log(`Director: ${director.map(actor => `${actor.getName()}`)}`);