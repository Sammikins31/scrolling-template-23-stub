// button used to animate the button-triggered animation
const animatorButton = document.getElementById("animator");
// button used to reset the button-triggered animation
const resetButton = document.getElementById("reset-animation");

resetButton.disabled = true;

/**
 * When the event onclick is triggered, the animator ubtton will activate the animation
 * @param {Event} event 
 */

animatorButton.onclick = (event) => {
    // animatorButton.parentNode is the div that we want to animate
    // By adding the class "right-to-left" to this div, the animation is triggered
    animatorButton.parentNode.classList.add("right-to-left");
    // once the animation is trigered, we disable the animator button as the button will not work until the class is not present again
    animatorButton.disabled = true;
      // once the animation is trigered, we enable the reset button so that the right-to-let class can be removed
    resetButton.disabled = false;
}
/**
 * When the event onclick is triggered, the reset button will reset the state of the animation so it can be triggered again
 * @param {Event} event 
 */
resetButton.onclick = (event) => {
    // resetButton.parentNode is the div that we want to animate
    // by removing the class "right-to-left" from this div, we allow the animation to be retriggered
    resetButton.parentNode.classList.remove("right-to-left");
    // once the animation is reset, enable the animation trigger button
    animatorButton.disabled = false;
    // once the animation is reset/disable the reset button as it won't have any effect until the animation is triggered again
    resetButton.disabled = true;
}

// <!-- ================================= INTERSECTION OBSERVER ================================= -->

// the options object is necessary for the intersection observer
// rootMargin: "0px" tells the observer that it should used the whole voewport (with no margin) to observe
// threshold: 0.1 tells the observer that an intersection should be trifered with the element is slightly inside the viewport
// if the threshold was 0, the observer might detect an intersection just before the element is in view
const options = {
    rootMargin: "0px",
    threshold: 0.1
}
/**
 * the callback is triggered when the observer intersects with any of the observed elements
 * the callback manages the adding and removing of the class "active"
 * @param entries 
 * @param observer 
 */

const callback = (entries, observer) => {
    /**
     * for (const entry of entries) {
     * 
     * }
     */

    // for (let i = 0; i < entries.length; i++){
    // const entry = entries[i];
    // }
    /**
     * loop through the entries array
     * each element of this array is an object that contains information related to each of the observed HTML elements
     * Specifically:
     * entry.isIntersecting -> is a boolean that will be a true when the lement is in view and false when the element is out of view
     * entry.targer -> is a reference to the HTML element that allows us to change its class
     */
    for(const entry of entries){
        // if the element is not in view (ie. not intersecting), then add the class "active" to trigger the corresponding animation
        if(entry.isIntersecting) {
            entry.target.classList.add("active");
        }else{
             // if the element is not in view (ie. not intersecting), then remove the class "active" to reset the corresponding animation
            entry.target.classList.remove("active");
        }
    }
}
/**
 * the observer object is linked to the viewport and contains the logic to trigger the callback every time an intersection is detected
 * to create the observer we need to have the callback and options predefined
 * new intersectionObserver (callback, options) is a precoded jaascript function that we can feely use
 */
const observer = new IntersectionObserver(callback, options);

// targetList is an array that contains all html elements with the class observable
// we add this cflass to detect elements in which an animation should be trigered upon intersecting with the viewport
const targetlist = document.getElementsByClassName("observable");
console.log(targetlist);

/**
 * to link each of the targets inside the targetList arrray we need to loop through them and let the observer object know these should be observed
 */
for(const target of targetlist) {
    // observer.observe(target) is a precoded javascript that we can freely use. It individually links each target to the observer
    observer.observe(target);
}