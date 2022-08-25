document.addEventListener("DOMContentLoaded", function() {
    const list = document.getElementById("list");
    const panel = document.getElementById("show-panel");
    const userId = 10;

    fetch("http://localhost:3000/books").then(res => res.json()).then(data => {
        data.map(({id,title, subtitle, description,author, img_url, users}) => {
            const li = document.createElement("li");
            li.textContent = title;
            list.appendChild(li);

            li.addEventListener("click", () => {
                panel.innerHTML = "";
                const img = document.createElement("img");
                const h2 = document.createElement("h2");
                const h3 = document.createElement("h3");
                const span = document.createElement("span");
                const p = document.createElement("p");
                const ul = document.createElement("ul");
                const button = document.createElement("button");

                img.src = img_url;
                h2.textContent = title;
                h3.textContent = subtitle;
                span.textContent = author;
                p.textContent = description;
                button.textContent = "Like";

                users.map(({id, username}) => {
                    const li = document.createElement("li");
                    li.textContent = username;
                    ul.appendChild(li);
                })

                button.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log("clicked");

                    let foundIndex = 0;

                    const foundUser = users.find((user, index) => {
                        console.log(user);
                        foundIndex = index;
                        return user.id === userId;
                    })

                    if(foundUser){
                        users.splice(foundIndex, 1);
                        fetch(`http://localhost:3000/books/${id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type" : "application/json",
                                "Accept" : "application/json"
                            },
                            body : JSON.stringify({
                                "users": [
                                    ...users
                                ]
                            })
                        }).then(res => res.json()).then(data => console.log(data))
                    }else{
                        fetch(`http://localhost:3000/books/${id}`, {
                        method: "PATCH",
                        headers:{
                            "Content-Type" : "application/json",
                            "Accept" : "application/json"
                        },
                        body: JSON.stringify({
                            "users": [
                                ...users, 
                                {
                                    "id": 10,
                                    "username": "macejkovic"
                                }
                            ]
                        })
                    }).then(res => res.json()).then(data => {
                        console.log(data);
                    })
                    }                    
                })

                panel.appendChild(img);
                panel.appendChild(h2);
                panel.appendChild(h3);
                panel.appendChild(span);
                panel.appendChild(p);
                panel.appendChild(ul);
                panel.appendChild(button);
            })
        })
    })
});
