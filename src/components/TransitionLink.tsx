import { usePageTransition } from "../context/TransitionContext"


interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string
}


export default function TransitionLink({ to, onClick, children, ...rest }: Props) {
    const {triggerNavigation} = usePageTransition()

    // Check to see if we're navigating within the website
    const isInternal = to.startsWith('/') || to.startsWith('./')

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        // If it's an internal link, we trigger the transition animation
        if (isInternal && !e.defaultPrevented) {
            e.preventDefault()
            triggerNavigation(to.startsWith('./') ? to.slice(1) : to)
        }
    }

    return (
        <a href={to} onClick={handleClick} {...rest}>
            {children}
        </a>
    )
}