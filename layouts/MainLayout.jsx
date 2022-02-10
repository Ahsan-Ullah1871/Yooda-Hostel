import React from "react";

const MainLayout = ({ children }) => {
	return (
		<div>
			<div className="w-full bg-neutral sticky top-0 left-0 right-0 z-50">
				<div className="navbar mb-2 shadow-lg   text-neutral-content  max-w-7xl mx-auto px-9 ">
					<div className="flex-none px-2 mx-2">
						<a
							className="text-lg font-bold"
							href="/"
						>
							Yooda Hostel
						</a>
					</div>
					<div className="flex-1 px-2 mx-2">
						<div className="items-stretch  flex">
							<a
								className="btn btn-ghost btn-sm rounded-btn"
								href="/"
							>
								Food
							</a>
							<a
								className="btn btn-ghost btn-sm rounded-btn"
								href="/students"
							>
								Students
							</a>
							<a
								className="btn btn-ghost btn-sm rounded-btn"
								href="/serving"
							>
								Serving food
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-9 mt-10 min-h-screen">
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
