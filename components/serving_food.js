import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Edit_food from "./edit_food";
import edit_food from "./edit_food";
import CustomLoading from "./shared/CustomLoading";
import ReactPaginate from "react-paginate";

const ServingFood = () => {
	const { register, handleSubmit } = useForm();
	const [foods, setFoods] = useState(null);
	const [students, setStudents] = useState(null);
	const [servedList, setservedList] = useState(null);

	const [isLoading, setIsLoading] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [success_msg, setSuccess_msg] = useState(null);
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	// fetch Data

	useEffect(() => {
		setIsLoading(true);
		axios.get("/api/food")
			.then((res) => {
				setIsLoading(false);
				setFoods(res.data.foods);
			})
			.catch((err) => {
				setIsLoading(false);
				alert(err.data.message);
			});
		axios.get("/api/student")
			.then((res) => {
				setStudents(res.data.students);
			})
			.catch((err) => {
				alert(err.data.message);
			});
		axios.get("/api/serving", { params: { page } })
			.then((res) => {
				setIsLoading(false);
				setservedList(res.data.list);
				setPageCount(Math.ceil(res.data.total_records / 5));
			})
			.catch((err) => {
				setIsLoading(false);
				alert(err.data.message);
			});
	}, [isSuccess]);

	// Save Item
	const onSubmit = (data) => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.get("/api/serving")
			.then((res) => {
				const check = res.data.list.find(
					(lit) =>
						lit.student_id == data.student_id &&
						lit.shift == data.shift &&
						lit.status == data.status &&
						lit.date == data.date
				);
				if (check === undefined) {
					axios.post("/api/serving", { ...data })
						.then((res) => {
							setIsLoading(false);
							setIsSuccess(true);
							setSuccess_msg(
								"Serve List Added Successfully"
							);
						})
						.catch((err) => {
							setIsLoading(false);
						});
				} else {
					setIsLoading(false);
					alert("Already served");
				}
			})
			.catch((err) => {
				setIsLoading(false);
				alert(err.data.message);
			});
	};

	// Edit Item
	const editClick = (data, id) => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.put("/api/food", { data: data, id })
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);
				setSuccess_msg("Food Item Added Successfully");
				const input_button = document.getElementById(
					`my-modal-${id}`
				);
				input_button.click();
			})
			.catch((err) => {
				setIsLoading(false);
				const input_button = document.getElementById(
					`my-modal-${id}`
				);
				input_button.click();
			});
	};

	// delete item
	const delete_food = (id) => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.delete("/api/food", {
			params: { id },
		})
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);
				setSuccess_msg("Food deleted successfully");
			})
			.catch((err) => {
				alert(err.data.message);
			});
	};

	return (
		<div>
			{isSuccess && success_msg && (
				<div className="alert">
					<div className="flex  w-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="#2196f3"
							className="w-6 h-6 mx-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<label className=" w-full flex-shrink">
							{success_msg}
						</label>
						<div className="w-full flex justify-end">
							<button
								className="btn btn-outline btn-circle btn-xs   "
								onClick={() => {
									setIsSuccess(
										false
									);
									setSuccess_msg(
										null
									);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="inline-block w-4 h-4 stroke-current"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
			<h2 className=" text-amber-400 mx-auto font-bold text-5xl text-center ">
				Serving Food Lists
			</h2>

			{/* Add New Item Part */}
			<div className="mt-9 flex justify-end">
				<label
					htmlFor="my-modal-2"
					className="btn btn-outline btn-accent"
				>
					Serve Food
				</label>
				<input
					type="checkbox"
					id="my-modal-2"
					className="modal-toggle"
				/>
				<div className="modal">
					<div className="modal-box">
						<h1 className=" text-center text-lg font-bold text-violet-600 ">
							Distribution Form
						</h1>
						<form
							onSubmit={handleSubmit(
								onSubmit
							)}
						>
							<select
								className="select select-bordered select-primary w-full max-w-xs mt-5"
								{...register(
									"student_id"
								)}
								required
							>
								<option
									disabled="disabled"
									selected="selected"
								>
									Select Student
								</option>
								{students?.map(
									(item) => {
										return (
											<option
												value={
													item._id
												}
												key={
													item._id
												}
											>
												{
													item.student_name
												}
											</option>
										);
									}
								)}
							</select>
							<select
								className="select select-bordered select-primary w-full max-w-xs mt-5"
								{...register(
									"food_name"
								)}
								required
							>
								<option
									disabled="disabled"
									selected="selected"
								>
									Select Food Item
								</option>
								{foods?.map((item) => {
									return (
										<option
											value={
												item.food_name
											}
											key={
												item._id
											}
										>
											{
												item.food_name
											}
										</option>
									);
								})}
							</select>
							<select
								className="select select-bordered select-primary w-full max-w-xs mt-5"
								{...register("shift")}
								required
							>
								<option
									disabled="disabled"
									selected="selected"
								>
									Select Shift
								</option>
								<option value="morning">
									Breakfast
								</option>
								<option value="morning">
									Launch
								</option>
								<option value="morning">
									Dinner
								</option>
							</select>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-base text-indigo-700">
										Select
										date
									</span>
								</label>
								<input
									id="date"
									type="date"
									placeholder="Date"
									className="input input-accent input-bordered"
									required
									{...register(
										"date"
									)}
								/>
							</div>
							<select
								className="select select-bordered select-primary w-full max-w-xs mt-5"
								{...register("status")}
								required
							>
								<option
									disabled="disabled"
									selected="selected"
								>
									Status
								</option>
								<option value="served">
									served
								</option>
								<option value="notServed">
									notServed
								</option>
							</select>
							<div className="modal-action">
								<label
									htmlFor="my-modal-2"
									className="btn btn-warning"
								>
									Cancel
								</label>
								<input
									value="Save Item"
									htmlFor=" my-modal-2"
									className="btn  btn-outline btn-primary px-4"
									type="submit"
									onClick={() => {
										const input_button =
											document.getElementById(
												"my-modal-2"
											);
										input_button.click();
									}}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* Foods Part */}
			<div className="overflow-x-auto mt-10">
				{servedList === null ? (
					<CustomLoading />
				) : (
					<>
						{!servedList.length > 0 ? (
							<div className="  w-full   ">
								<div className="alert alert-warning    ">
									<div className="flex-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											className="w-6 h-6 mx-2 stroke-current"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
											></path>
										</svg>
										<label>
											Not
											served
											to
											any
											student
										</label>
									</div>
								</div>
							</div>
						) : (
							<table className="table w-full">
								<thead>
									<tr>
										<th></th>
										<th>
											Student
											Name
										</th>
										<th>
											Food
											Name
										</th>
										<th>
											Date
										</th>
										<th>
											Status
										</th>
									</tr>
								</thead>
								<tbody>
									{servedList?.map(
										(
											it,
											index
										) => {
											return (
												<tr
													key={
														it._id
													}
												>
													<th>
														{index +
															1}
													</th>
													<td>
														{students?.map(
															(
																st
															) => {
																if (
																	st._id ==
																	it.student_id
																) {
																	return st.student_name;
																}
															}
														)}
													</td>
													<td>
														{
															it.food_name
														}
													</td>
													<td>
														{
															it.date
														}
													</td>
													<td>
														{
															it.status
														}
													</td>
												</tr>
											);
										}
									)}
								</tbody>
							</table>
						)}
						<div className="my-10 flex justify-center">
							<ReactPaginate
								breakLabel="..."
								nextLabel={
									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								}
								onPageChange={(data) =>
									setPage(
										Number(
											data.selected
										) + 1
									)
								}
								pageRangeDisplayed={2}
								pageCount={pageCount}
								previousLabel={
									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								}
								renderOnZeroPageCount={
									null
								}
								containerClassName=""
								className="relative z-0 inline-flex flex-wrap justify-center rounded-md shadow-sm -space-x-px "
								pageClassName="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center text-sm font-medium"
								pageLinkClassName="px-4 py-2 border"
								previousClassName="relative inline-flex items-center px-2 py-2   border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								nextClassName="relative inline-flex items-center px-2 py-2   border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								breakLinkClassName="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
								activeLinkClassName="z-10 bg-primary  border-primary text-white relative inline-flex items-center px-4 py-2 border text-md font-semibold"
								disabledLinkClassName=""
								prevPageRel="2"
								forcePage={page - 1}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ServingFood;
