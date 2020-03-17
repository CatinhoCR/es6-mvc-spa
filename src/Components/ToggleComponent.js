
export default class ToggleComponent {
    constructor() {

    }
    async toggleContent(elem) {
        // This should be moved to a reusable file, an importable and reusable component to create toggles?
        console.log(elem);
        // console.log(elem.dataset.target)
        // this.originalText = elem.innerHTML;
        // this.cancelText = 'Cancel';
        let target = elem.dataset.target;
        let content = document.getElementById(target);
        let title = elem.dataset.panelHeader;
        let header = document.getElementById(title);
        let input = elem.dataset.focusArea;
        this.input = document.getElementById(input);
        // console.log(content);
        function show(elem) {
            
            // // Get the natural height of the element
            var getHeight = function () {
                elem.style.display = 'block'; // Make it visible
                var height = elem.scrollHeight + 'px'; // Get it's height
                elem.style.display = ''; //  Hide it again
                return height;
            };

            var height = getHeight(); // Get the natural height
            elem.classList.add('is-visible'); // Make the element visible
            elem.style.height = height; // Update the max-height

            // Once the transition is complete, remove the inline max-height so the content can scale responsively
            window.setTimeout(function () {
                elem.style.height = '';
            }, 350);

            // elem.innerHTML = this.originalText;
            // content.classList.add('is-visible');
            // console.log("SHow");
        }

        function hide(elem) {
            // Give the element a height to change from
            elem.style.height = elem.scrollHeight + 'px';

            // Set the height back to 0
            window.setTimeout(function () {
                elem.style.height = '0';
            }, 1);

            // When the transition is complete, hide it
            window.setTimeout(function () {
                elem.classList.remove('is-visible');
            }, 350);

            // elem.innerHTML = this.cancelText;
            // console.log("Hide");
            // content.classList.remove('is-visible');
        }

        // Toggler
        if (content.classList.contains('is-visible')) {
            hide(content);
            if (header) {
                show(header);
            }
            return;
        }
        show(content);
        if(header) {
            hide(header);
        }
        if(input){
            this.input.focus();
        }
    }
}