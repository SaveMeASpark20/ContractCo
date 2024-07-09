export const ErrorText = ({children}: {children? : string}) => {
    return(
        <>{children && <p className="text-xs text-red-500 pt-1">{children}</p>}</>
    )
}