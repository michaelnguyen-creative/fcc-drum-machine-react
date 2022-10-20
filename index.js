const audioClips = [{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "id": "Heater-1",
    "keyCode": 81,
    "keyTrigger": "Q",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "id": "Heater-2",
    "keyCode": 87,
    "keyTrigger": "W",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "id": "Heater-3",
    "keyCode": 69,
    "keyTrigger": "E",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "id": "Heater-4",
    "keyCode": 65,
    "keyTrigger": "A",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "id": "Clap",
    "keyCode": 83,
    "keyTrigger": "S",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "id": "Open-HH",
    "keyCode": 68,
    "keyTrigger": "D",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "id": "Kick-n'-Hat",
    "keyCode": 90,
    "keyTrigger": "Z",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "id": "Kick",
    "keyCode": 88,
    "keyTrigger": "X",
},
{
    "url": "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    "id": "Closed-HH",
    "keyCode": 67,
    "keyTrigger": "C",
},
];

function Pad(props) {
    const [blink, setBlink] = React.useState(false);

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyPress)
        return () => (
            document.removeEventListener("keydown", handleKeyPress)
        )
    })

    const handleKeyPress = (e) => {
        if (props.power && e.keyCode == props.padData.keyCode) {
            playSound();
        }
    }

    const playSound = () => {
        if (props.power) {
            const audioTag = document.getElementById(props.padData.keyTrigger);
            setBlink(true);
            setTimeout(() => { setBlink(false) }, 100);
            audioTag.volume = props.level;
            audioTag.play();
            props.setInfo(props.padData.id)
        }
    }

    return (
        <div
            class={`btn btn-warning p-4 m-2 ${blink && 'btn-danger'}`}
            onClick={playSound}
        >
            {props.padData.keyTrigger}
            <audio
                class="clip"
                id={props.padData.keyTrigger}
                src={props.padData.url}
            />
        </div>
    )
}

function VolumeSlider(props) {
    return (
        <input
            type="range"
            class="form-range w-50"
            id="slider"
            min="0"
            max="1"
            step="0.1"
            value={props.level}
            onChange={(e) => {
                if (props.power) {
                    props.setLevel(e.target.value);
                    props.setInfo(e.target.value);
                }
            }}
        />
    )
}

function Display(props) {
    return <h1 class="text-light">{props.info}</h1>
}

function App() {
    const [power, setPower] = React.useState(false);
    const [level, setLevel] = React.useState(0.5);
    const [info, setInfo] = React.useState('Power off');

    const togglePower = () => {
        setPower(!power);
        if (power == false) {
            setInfo('Power on')
        } else {
            setLevel(0.5);
            setInfo('Power off');
        }
    }

    return (
        <div class="container bg-info bg-gradient min-vh-100" id="drum-machine">
            <div className="col"></div>
            <h1 class="text-center text-white">Drum Machine</h1>
            <div class="form-check form-switch" id="power">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={togglePower} />
                <label class="form-check-label fw-bold" for="flexSwitchCheckChecked">Power</label>
            </div>
            <div class="container">
                {audioClips.map((clip) => (
                    <Pad key={clip.id} padData={clip} level={level} setInfo={setInfo} power={power} />
                ))}
            </div>
            <div class="container" id="volume-controller">
                <h1>Volume</h1>
                <VolumeSlider level={level} setLevel={setLevel} setInfo={setInfo} power={power} />
            </div>
            <div class="container bg-success text-center w-50" id="display">
                <Display info={info} power={power} />
            </div>
        </div>
    )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
