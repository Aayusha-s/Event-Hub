type ToggleProops = {
    checked: boolean;
    onChange: () => void;
}

const ToggleSwitch = ({
    checked,
    onChange
}: ToggleProops) => {
    return (
        <button
            onClick={onChange}
            className={`w-12 h-6 rounded-full transition relative cursor-pointer
                ${checked ? 'bg-brown-normal' : 'bg-gray-300'}`}
        >
            <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition cursor-pointer
                    ${checked ? 'translate-x-6' : ''}`}
            />
        </button>
    )
}

export default ToggleSwitch
