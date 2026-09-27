interface CheckboxProps {
    children: React.ReactNode;
    id?: string;
    name?: string;
    props?: any;
}

const Checkbox = ({ children, ...props }: CheckboxProps) => {
    return (
        <div className="flex flex-row items-center justify-start gap-2">
            <div className="group grid size-4 grid-cols-1">
                <input
                    id={props.id}
                    type="checkbox"
                    name={props.name}
                    aria-describedby="candidates-description"
                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-700 checked:bg-indigo-700 indeterminate:border-indigo-700 indeterminate:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                >
                    <path
                        d="M3 8L6 11L11 3.5"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="opacity-0 group-has-checked:opacity-100"
                    />
                    <path
                        d="M3 7H11"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="opacity-0 group-has-indeterminate:opacity-100"
                    />
                </svg>
            </div>
            <div>
                <label htmlFor={props.id} className="text-sm text-gray-500">
                    {children}
                </label>            
            </div>
        </div>
    );
};

export default Checkbox;
