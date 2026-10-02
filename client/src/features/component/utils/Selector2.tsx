
interface Selector2Props {
    children?: any;
    options: any;
    selected: any;
    handler: any;
    type?: string;
    alignment?: string;
    className?: string;
}

const Selector2 = ({children, ...props}: Selector2Props): any => {
    const mapRoles = (option: any) => {
        const isSelected = props.selected === option.id;
        return (
            <button
                key={option.id}
                type="button"
                onClick={() => props.handler(option.id)}
                className={`flex-1 flex flex-row items-center justify-center md:justify-start py-2 px-2 rounded-md text-sm font-medium transition-all duration-200 gap-2  ${isSelected ? "bg-blue-50 text-blue-600" : " text-gray-700 hover:bg-white"} `}
                title={option.name}
            >
                {option.icon && <span className="flex-shrink-0 flex items-center justify-center w-6 h-6" dangerouslySetInnerHTML={{ __html: option.icon }}></span>}
                <span className="hidden md:block truncate">{option.name}</span>
            </button>
        );
    };

    return <div className={`flex ${props.alignment==='col'? 'flex-col': 'flex-row'} ${props.className? props.className : 'w-full bg-gray-100 gap-2 rounded-xl border border-slate-200 p-1'} `}>{props.options.map(mapRoles)}</div>;
};

export default Selector2;
