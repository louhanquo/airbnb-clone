`use client`

interface MenuItemProps {
    onclick: ()=>void
    label: string
}

const MenuItem: React.FC<MenuItemProps> = ({
    onclick,
    label
}) =>{
    return(
        <div className="px-4 py-3 hover:bg-neutral-100 transition font-semibold" onClick={onclick}>
            {label}
        </div>
    )
}

export default MenuItem