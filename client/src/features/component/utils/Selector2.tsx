
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
                className={`flex-1 flex flex-row items-center py-2 px-2 rounded-md text-sm font-medium transition-all duration-200 gap-1  ${isSelected ? "bg-blue-50 text-blue-600" : " text-gray-700 hover:bg-white"} `}
            >
                {option.icon && <span dangerouslySetInnerHTML={{ __html: option.icon }}></span>}
                {option.name}
            </button>
        );
    };

    return <div className={`flex ${props.alignment==='col'? 'flex-col': 'flex-row'} ${props.className? props.className : 'w-full bg-gray-100 gap-2 rounded-xl border border-slate-200 p-1'} `}>{props.options.map(mapRoles)}</div>;
};

export default Selector2;
