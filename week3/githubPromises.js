//here i am trying to build the structure of the webpage by creating the input, button and ul tags and append
// them to the body 
let search = document.createElement('input');
document.body.appendChild(search);
search.setAttribute('type', 'search');
search.setAttribute('id', 'searchIn');

let button = document.createElement('button');
document.body.appendChild(button);
let searchButton = document.createTextNode("Search Here");
button.appendChild(searchButton);

let list = document.createElement('ul');
document.body.appendChild(list);
list.setAttribute('id', 'repoList')

//here i am trying to enable the button "enter" with inserting the username's name in the input field

document.querySelector('#searchIn').addEventListener('keypress', function (enter) {
    let key = enter.which || enter.keyCode;
    if (key === 13) { githubUserSearch() }
});
    
//the button event

button.addEventListener('click', githubUserSearch)

// here


function githubUserSearch() {
    let userName = document.querySelector('#searchIn').value;
    let repositoriesUrl = 'https://api.github.com/users/' + userName + '/repos'
    let repoList = document.getElementById('repoList');
    fetch(repositoriesUrl)
        .then(response => {
            console.log("step 1")
            return response.json()
        })
    // the result from the previous .then( which is the returned information for the url in text form) is been taken 
    // and used in the bellow .then so i can build the page according to and list the name of repos.
        .then(function (response) {
            console.log("step 2")
            // i want here to delete the results from the previous search by using while loop
            while (repoList.firstChild) {
                repoList.removeChild(repoList.firstChild);
            }

            let repoName = response.map(repo => {
                let listItems = document.createElement('li');
                list.appendChild(listItems);
                listItems.innerHTML = repo.name;
                let commitList = document.createElement('ul')
                listItems.appendChild(commitList);
                commiters = 'https://api.github.com/repos/'+ userName + '/' + repo.name + '/commits';

                fetch(commiters)
                    .then(response => {
                        console.log("step 3")
                        return response.json()
                    })
                    .then(responce => {
                        console.log("step 4")
                        let listItems2 = document.createElement('li');
                        commitList.appendChild(listItems2);

                        listItems2.innerHTML = responce[0].commit.author.name;
                        let avatarImg = document.createElement('img');
                        avatarImg.src = responce[0].author.avatar_url;
                        avatarImg.setAttribute('width', '100 px');
                        avatarImg.setAttribute('height', '100 px');
                        listItems2.appendChild(avatarImg);
                    })
            })
        })
        // here i am trying to catch the error or if there is an error this catch will handle it and show ot as
        // a messsage in the page
        .catch(error => {
            console.log(error.message);
            let wrongUserName = document.createElement("h2")
            document.body.appendChild(wrongUserName)
            wrongUserName.innerHTML = error.message
        });

}
