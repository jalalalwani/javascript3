window.onload = function init() {

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

    document.querySelector('#searchIn').addEventListener('keypress', function (enter) {
        var key = enter.which || enter.keyCode;
        if (key === 13) { githubUserSearch() }
    });

    button.addEventListener('click', githubUserSearch)

    function githubUserSearch() {

        let userName = document.querySelector('#searchIn').value;
        let userUrl = 'https://api.github.com/users/' + userName;
        let repositoriesUrl = 'https://api.github.com/users/' + userName + '/repos';
        let userXHR = new XMLHttpRequest();
        userXHR.onreadystatechange = () => {
            if (userXHR.readyState === XMLHttpRequest.DONE) {
                if (userXHR.status !== 200 && userXHR.status !== 404) {
                    console.log("Something went wrong")
                } else if (userXHR.status == 404) {
                    let wrongUserName = document.createElement("h2")
                    document.body.appendChild(wrongUserName)
                    wrongUserName.innerHTML = "Wrong User Name!"
                } else {
                    console.log("Successfully loaded");

                    let repoList = document.getElementById('repoList');

                    while (repoList.firstChild) {
                        repoList.removeChild(repoList.firstChild);
                    }

                    let repositories = JSON.parse(userXHR.responseText).map(userRepositories => {
                        let listItems = document.createElement('li');
                        list.appendChild(listItems);
                        listItems.innerHTML = userRepositories.name;

                        let commitList = document.createElement('ul')
                        listItems.appendChild(commitList);

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
                        commitsXHR.send();
                        console.log()
                    })
                }
            }
        };
        userXHR.open('GET', repositoriesUrl, true);
        userXHR.send();
        console.log()
    }

}