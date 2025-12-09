
const baseStyles =
    "w-[90px] border border-brown-dark bg-transparent text-text-light cursor-pointer transition-all hover:bg-brown-light-active hover:border-brown-dark-hover hover:-translate-y-0.5 hover:shadow-md";

const buttonSizes = {
    normal: "w-[90px] h-[40px] rounded-[10px]",
    tags: "w-[90px] h-[30px] rounded-[40px]",
}

interface ButtonProps {
    title?: string;
    size?: "normal" | "tags";
    icon?: React.ReactNode;
}

// export const Button = ()=>{
//     return (
        
//     )
// }
// export const TagsButton = () => {
//     return (
        
//     )
// }


// export const ButtonPrimary = () => {
//     return (
//     )
// }

export const ButtonSecondary = () => {
    return (
        <button
            className='w-[90px] h-10 
            rounded-[10px] border 
            border-brown-dark bg-transparent 
            text-text-light hover:bg-brown-light-active 
            hover:border-brown-dark-hover 
            hover:-translate-y-0.5 
            hover:shadow-md transition-all 
            cursor-pointer'>

            Login
        </button>
    )
}

