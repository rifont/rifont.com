export const Badge = (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
    return (
        <a
            {...props}
            target="_blank"
            className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded p-1 text-sm inline-flex items-center leading-4 text-slate-900 dark:text-slate-100 no-underline"
        />
    );
}
