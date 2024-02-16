'use client';

import '@fontsource/inter/400.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContributeAlert } from '@/components/New/academics/home-page/alert-dialog/contribute';

export function SectionTopContributors() {
    return (
        <>
            <ContributeAlert />
            <div className="flex justify-center p-6">
                <span className="text-lg font-semibold">Top Contributors</span>
            </div>
            <div className="">
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
