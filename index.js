let floorsCalledQueue= [];
const numberOfLifts = 2
let liftsArray = []
let floorContainer = document.getElementById("floors-container");

// let liftDetails = {
//   current_floor: 0,
//   moving: false,
// };

//** this function gets all the lifts and pushes it in and array for easy maintainance */
(function(){
  for(let i=1; i <=numberOfLifts; i++){
    const lift = document.getElementById(`lift_${i}`); 
    if(lift){
      const liftObj={
        name: lift,
        current_floor:0,
        moving: false,
      }
      liftsArray.push(liftObj);
    }
  }
})()
console.log(liftsArray,"this is lifts array")

//** this function will schedule the lifts to move to the next floor */
function scheduleLifts(e){
  console.log("cakked")
  //** this variable is for registering the liftcall */
  const registerLiftCall = e
  floorsCalledQueue.push(registerLiftCall) 
  makeliftsMove()
}

function makeliftsMove(){
  console.log(floorsCalledQueue,"floors called queue")
  if(floorsCalledQueue.length > 0){
    const floor = floorsCalledQueue.shift()
    const idleLift = liftsArray.find(lift => !lift.moving)
    floorDetails(floor,idleLift)
  }
}

function floorDetails(e,lift) {
  const floorCalledOn = e.target.id.split("_")[0];
  const floorCalledAction = e.target.id.split("_")[1];

if (floorCalledAction === "up" ||floorCalledAction === "down") {
    if (floorCalledOn === lift.current_floor) {
        return null;
    } else if (
        floorCalledOn !== lift.current_floor &&
        floorCalledOn > lift.current_floor
    ) {
        //when the floor you call on is greater than the current floor
        //take the difference between the floors and just move the life  accordingly
        const floorDifference = floorCalledOn - lift.current_floor;
        lift.moving = true;
        lift.name.style.top =
        Number(lift.name.style.top.split("r")[0]) - floorDifference * 7 + "rem";
        lift.current_floor = floorCalledOn;
        lift.moving = false;
    } else if (
      floorCalledOn !== lift.current_floor &&
      floorCalledOn < lift.current_floor
    ) {
        //when the floor you call on is lesser than the current floor
        //take the difference between the floors and just move the life  accordingly
        const floorDifference =  lift.current_floor - floorCalledOn
        lift.moving = true;
        lift.name.style.top =
        Number(lift.name.style.top.split("r")[0]) + floorDifference * 7 + "rem";
        lift.current_floor = floorCalledOn;
        lift.moving = false;
    }
  }
}

floorContainer.addEventListener("click", scheduleLifts);
