"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChangePasswordAlert } from "@/components/New/avatar-sheet/alert-dialog/change-password"
import { ReportIssueAlert } from "@/components/New/avatar-sheet/alert-dialog/report-issue"

export function AvatarSheet() {
    return (
        <div>
            <Sheet key="left">
                <SheetTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <Avatar className="w-full h-full">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex justify-center w-full">
                            <SheetTitle className="text-2xl">Ojassvi Kumar</SheetTitle>
                        </div>
                    </SheetHeader>
                    <div className="space-y-2 py-10 w-full">
                        <div>
                            <Button variant="outline" className="w-full text-md">
                                View Profile
                            </Button>
                        </div>
                        <div>
                            <ChangePasswordAlert />
                        </div>
                        <div>
                            <ReportIssueAlert />
                        </div>
                        <div>
                            <Button variant="outline" className="w-full text-md">
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
