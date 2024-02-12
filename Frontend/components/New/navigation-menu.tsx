'use client';

import '@fontsource/inter/400.css';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Link from 'next/link';
import { SiInformatica } from 'react-icons/si';
import { ModeToggle } from '@/components/New/mode-toggle';
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function NavigationBar() {
    return (
        <div className="border-b py-2.5 px-6 flex justify-between items-center">
            <NavigationMenu>
                <NavigationMenuList className="flex items-center space-x-4">
                    <NavigationMenuItem>
                        <div className="flex items-center">
                            <SiInformatica size={30} />
                            <p className="ml-1 text-lg font-bold">InfoNest</p>
                        </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/academics" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/temp-academics" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Academics
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="#" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About Us
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center space-x-4">
                <ModeToggle />
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

