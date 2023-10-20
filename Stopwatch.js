class Stopwatch {
    #elapsetTimeInSeconds = 0; //'#' membro privado
    #intervalID = null;
    start(callback = () => { }) {
        this.#intervalID = setInterval(() => {
            this.#elapsetTimeInSeconds++;
            console.log(this.elapsedtime);
            callback()
        }, 1000);
        ;
    }
    stop(callback = () => { }) {
        clearInterval(this.#intervalID);
        callback();
    }
    reset(callback = () => { }) {
        this.#elapsetTimeInSeconds = 0;
        callback();
    };

    get elapsedtime() {
        return Stopwatch.formatTime(this.#elapsetTimeInSeconds);
    }

    static formatTime(timeInSeconds) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds - hours * 3600 - minutes * 60;

        return `${Stopwatch.formatValue(hours)}:${Stopwatch.formatValue(minutes)}:${Stopwatch.formatValue(seconds)}`
    }
    static formatValue(originalNumber, digitNuber = 2) {
        let stringNumber = String(originalNumber);
        const zeroRequired = digitNuber - stringNumber.length
        if (zeroRequired <= 0) {
            return stringNumber;
        }
        for (let counter = 0; counter < zeroRequired; counter++) {
            return `0${stringNumber}`
        }
    }
}

const btstart = document.getElementById('start');
const btstop = document.getElementById('stop');
const btreset = document.getElementById('reset');
const div = document.getElementById("cronometro");

function uptateDisplay() {
    div.innerText = sw1.elapsedtime
}
const sw1 = new Stopwatch();
btstart.addEventListener('click', () => {
    sw1.start(uptateDisplay);
});
btstop.addEventListener('click', () => sw1.stop());
btreset.addEventListener('click', () => {
    sw1.reset(uptateDisplay);
});