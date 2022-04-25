const $container = document.getElementById("container");
const $input = document.getElementById("input");
const $btn = document.getElementById("btn");

function search(mass) {
    let someText = "";
    for(key in mass) {
        someText += `<li>${mass[key].body}</li>
        <br>`
    };
    return someText;
};

async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    $container.innerHTML = `<ul>${search(data)}</ul>`;

    $input.addEventListener("input", () => {
        const poisk = data.filter(
            el =>  el.body.toLowerCase().indexOf($input.value.toLowerCase()) >= 0
        );
    
        $container.innerHTML = `<ul>${search(poisk)}</ul>`;
    });
};

getPosts();