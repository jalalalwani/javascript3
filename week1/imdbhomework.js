/* Inspired by the lesson.
// Create the following objects: Movies, Staff.

Fill the following methods:
Movies {
    getStars()
    getWrites()
    getDirector()
    getRating()
    rate()
    // ... Add yours :-) Look to IMDB for inspiration
}

Staff {
    getName()
    getRole()
    getAge()
    // ... Add yours :-) Look to IMDB for inspiration
}

// Initialize the objects
// by pick your favorite movie from http://www.imdb.com/
// and make sure that the following actions would works.
console.log(InstanceMovie.getStars().map(actor => `${actor.getName()} ${actor.getAge()}`));
const director = InstanceMovie.getDirector();
console.log(`Director: ${director.getName()}`);
// Be creative with this let's see what you come up with :-)*/

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
        return this.rating.reduce((total, singleRate) =>
        {
            return (total += singleRate) / this.rating.length;
        })
    }
}


class Staff {
    constructor(name, role, date_of_birth ) {
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
const Stan_Lee= new Staff("Stan Lee","director","1922-12-03")
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