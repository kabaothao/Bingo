const game = () => {
  //todo create a new room
  createRoom();
};

document.getElementById("startGameBtn").addEventListener("click", game);

const joinGame = () => {
  //todo join a room
  getRoom();
};

document.getElementById("joinGame").addEventListener("click", joinGame);

let createRoom = async function(){
  let username = localStorage.getItem("username");
  localStorage.setItem("ishost", "true");
  const response = await fetch(`/api/lobby`, {
    method: "POST",
    body:  JSON.stringify({
      "balls_drawn": "",
      "admin": username,
      "is_gameover": false
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    let result = await response.json();
    localStorage.setItem("roomid", result.id);
    document.location.replace("/game");
  }else {}
}

let getRoom = async function(){
  let id = document.getElementById("lobbyid").value;
  localStorage.setItem("ishost", "false");
  if(!id){alert('Please Enter Lobby ID to Join Game!'); return;}
  const response = await fetch(`/api/lobby/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    let result = await response.json();
    let username = localStorage.getItem("username");
    localStorage.setItem("roomid", result.id);
    result.admin == username ? localStorage.setItem("ishost", "true") : localStorage.setItem("ishost", "false");
    document.location.replace("/game");
  }else {
    alert('Searched Lobby was not found!');
  }
}

