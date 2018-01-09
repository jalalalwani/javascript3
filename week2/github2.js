window.onload = function init() {
// here i am creating the html tags (input, button, ul) and append them to (body)
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
// creating the "enter" event so that the reqest could start either by pressing enter or by clicking on submit
    document.querySelector('#searchIn').addEventListener('keypress', function (enter) {
        var key = enter.which || enter.keyCode;
        if (key === 13) { githubUserSearch() }
    });
// here is the button event
    button.addEventListener('click', githubUserSearch)

    function githubUserSearch() {

        let userName = document.querySelector('#searchIn').value; // assign the input value to a variable
        let userUrl = 'https://api.github.com/users/' + userName; // add the previuos variable to the links we need to get the userinfo from
        let repositoriesUrl = 'https://api.github.com/users/' + userName + '/repos';// the link to access the repos
        let userXHR = new XMLHttpRequest();
        userXHR.onreadystatechange = () => {
            // checking the status of the request
            if (userXHR.readyState === XMLHttpRequest.DONE) {
                if (userXHR.status !== 200 && userXHR.status !== 404) {
                    console.log("Something went wrong")
                } else if (userXHR.status == 404) { // here to check if the username exist or not
                    let wrongUserName = document.createElement("h2")
                    document.body.appendChild(wrongUserName)
                    wrongUserName.innerHTML = "Wrong User Name!"
                } else {
                    console.log("Successfully loaded");
                    // this step to clear the previuos search results without refreshing
                    let repoList = document.getElementById('repoList');
                    while (repoList.firstChild) {
                        repoList.removeChild(repoList.firstChild);
                    }
                    //here i want to create a "li" and append it to the previuos "ul" so the repos of the user are listed in order.
                    let repositories = JSON.parse(userXHR.responseText).map(userRepositories => {
                        let listItems = document.createElement('li');
                        list.appendChild(listItems);
                        listItems.innerHTML = userRepositories.name;
                        //here creating a new "ul" within each "li repos" for the new information of the repo (last commiter and avatar)
                        let commitList = document.createElement('ul')
                        listItems.appendChild(commitList);
                        // a new request to get both the commiter and the avatar.
                        let commitsXHR = new XMLHttpRequest();
                        commitsXHR.onreadystatechange = () => {
                            if (commitsXHR.readyState === XMLHttpRequest.DONE) {
                                if (commitsXHR.status !== 200) {
                                    console.log("Something went wrong")
                                } else {

                                    console.log("Successfully loaded");

                                    let committers = JSON.parse(commitsXHR.responseText)

                                    let listItems2 = document.createElement('li');
                                    commitList.appendChild(listItems2);

                                    listItems2.innerHTML = committers[0].commit.author.name;
                                    let avatarImg = document.createElement('img');
                                    avatarImg.src = committers[0].author.avatar_url;
                                    avatarImg.setAttribute('width', '100 px');
                                    avatarImg.setAttribute('height', '100 px');
                                    listItems2.appendChild(avatarImg);
                                }


                            }
                        }

                        commitsXHR.open('GET', 'https://api.github.com/repos/' + userName + '/' + userRepositories.name + '/commits', true);
                        
                        myXHR.setRequestHeader("Authorization", "Basic " + btoa("jalalalwani:yourToken");// this line is to solve the problem
                                               // of the limit of authorised requests per hour, the tokenshould be secret in an separete file
                        commitsXHR.send();
                        console.log()
                    })
                }
            }
        };
        userXHR.open('GET', repositoriesUrl, true);
        myXHR.setRequestHeader("Authorization", "Basic " + btoa("jalalalwani:yourToken");
        userXHR.send();
        console.log()
    }

}
