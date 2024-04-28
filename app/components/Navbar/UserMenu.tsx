'use client'
//icons
import { AiOutlineMenu } from "react-icons/ai"
//components
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
//hooks
import { useCallback, useState } from "react"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import {signOut} from "next-auth/react"
import { SafeUser } from "@/app/types"
import { User } from "@prisma/client"
import useRentModal from "@/app/hooks/useRentModal"
import RentModal from "../Modals/RentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps{
    currentUser?: SafeUser | null 
}

const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) =>{
    const [isOpen,setIsOpen] = useState(false)
    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=> !value)
    },[])

    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const rentModal = useRentModal()
    
    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen
        }

        rentModal.onOpen()      
    },[currentUser, loginModal, rentModal])

   
    return(
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Alions your properties   
                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral=200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser?(
                            <>
                                <MenuItem onclick={()=>router.push("/trips")} label="My trips"/>
                                <MenuItem onclick={()=>router.push('/favorites')} label="My favourite"/>
                                <MenuItem onclick={()=>router.push('/reservations')} label="My reservations"/>
                                <MenuItem onclick={()=>router.push('/properties')} label="My Properties"/>
                                <MenuItem onclick={rentModal.onOpen} label="Alions my properties"/>
                                <MenuItem onclick={()=>signOut()} label="Logout"/>
                            </>
                        ): (
                            <>
                            <MenuItem onclick={loginModal.onOpen} label="Log in"/>
                            <MenuItem onclick={registerModal.onOpen} label="Sign up"/>
                        </>
                        )}
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu