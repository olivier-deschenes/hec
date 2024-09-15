import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts";
import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export const Navigation = () => {
	const { session, logout } = useAuthContext();

	return (
		<div className={"flex gap-5 w-full justify-between items-center"}>
			<div>
				<Button asChild variant={"outline"}>
					<Link to="/programs">Programs</Link>
				</Button>
			</div>
			<div className={"ml-auto"}>
				{session ? (
					<div className={"flex gap-2"}>
						<DropdownMenu>
							<DropdownMenuTrigger
								className={
									"flex gap-2 items-center hover:bg-slate-50 rounded-md px-2.5 py-1.5"
								}
							>
								<div>{session.user.user_metadata?.name}</div>
								<Avatar className={"w-8 h-8"}>
									<AvatarImage src={session.user.user_metadata?.picture} />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent className={"w-[200px]"}>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={logout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<Button asChild>
						<Link to="/auth/login">Login</Link>
					</Button>
				)}
			</div>
		</div>
	);
};
