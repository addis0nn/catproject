const API_URL = `https://api.thecatapi.com/v1/`;
const API_KEY = "DEMO_API_KEY";

let currentImageToVoteOn;

function showVoteOptions() {
    document.getElementById("grid").innerHTML = '';

    document.getElementById('vote-options').style.display = 'block';
    document.getElementById('vote-results').style.display = 'none';

    showImageToVoteOn()
}

function showImageToVoteOn() {

    const url = `${API_URL}images/search`;

    fetch(url,{headers: {
            'x-api-key': API_KEY
        }})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            currentImageToVoteOn = data[0];
            document.getElementById("image-to-vote-on").src= currentImageToVoteOn.url;
        });

}

function vote(value) {

    const url = `${API_URL}votes/`;
    const body = {
        image_id:currentImageToVoteOn.id,
        value
    }
    fetch(url,{method:"POST",body:JSON.stringify(body),headers: {
            'content-type':"application/json",
            'x-api-key': API_KEY
        }})
        .then((response) => {
            showVoteOptions()
        })
}

showVoteOptions()
