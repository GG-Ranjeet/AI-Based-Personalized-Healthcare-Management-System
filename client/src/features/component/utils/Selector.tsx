
interface SelectorProps {
    children?: any;
    options: any;
    name?: string;
    selected: any;
    handler: any;
    type?: string;
    alignment?: string;
    className?: string;
}

const selector = ({children, ...props}: SelectorProps): any => {
    const mapRoles = (option: any) => {
        const isSelected = props.selected === option.id;
        return (
            <button
                key={option.id}
                name={option.name}
                type="button"
                onClick={() => props.handler(option.id)}
                className={`flex-1 py-1 px-2 rounded-md text-sm font-medium transition-all duration-200 gap-1  ${isSelected ? "bg-blue-800 text-white" : " text-gray-700 hover:bg-white"} `}
            >
                {option.name}
            </button>
        );
    };

    return <div className={`flex ${props.alignment==='col'? 'flex-col': 'flex-row'} ${props.className? props.className : 'w-full bg-gray-100 gap-2 rounded-xl border border-slate-200 p-1'} `}>{props.options.map(mapRoles)}</div>;
};

export default selector;
