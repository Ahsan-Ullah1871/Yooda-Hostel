import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomLoading from "./shared/CustomLoading";
import Edit_student from "./edit_student";
import ReactPaginate from "react-paginate";

const Students_page = () => {
	const { register, handleSubmit } = useForm();
	const [students, setStudents] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [success_msg, setSuccess_msg] = useState(null);
	const [selected_students, setSelected_students] = useState(null);

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);

	// fetch Data

	useEffect(() => {
		axios.get("/api/student", { params: { page } })
			.then((res) => {
				setStudents(res.data.students);
				setPageCount(Math.ceil(res.data.total_records / 5));
			})
			.catch((err) => {
				alert(err.data.message);
			});
	}, [isSuccess, page]);

	// Save Item
	const onSubmit = (data) => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.post("/api/student", { ...data })
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);
				setSuccess_msg("Student   Added Successfully");
			})
			.catch((err) => {
				setIsLoading(false);
			});
	};

	// Edit Item
	const editClick = (data, id) => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.put("/api/student", { data: data, id })
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);
				setSuccess_msg("Student updated Successfully");
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
	const delete_student = (id) => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.delete("/api/student", {
			params: { id },
		})
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);
				setSuccess_msg("Student deleted successfully");
			})
			.catch((err) => {
				alert(err.data.message);
			});
	};

	// Select
	const select_student = (student) => {
		const data = {
			id: student._id,
			status: student.status == "active" ? "inActive" : "active",
		};
		if (selected_students == null || selected_students.length == 0) {
			setSelected_students([data]);
		} else {
			const filter = selected_students.filter(
				(it) => it.id !== student._id
			);
			const find = selected_students.find(
				(it) => it.id === student._id
			);
			console.log(filter);
			if (find == undefined) {
				setSelected_students([data, ...selected_students]);
			} else {
				setSelected_students([...filter]);
			}
		}
	};

	const update_selected_students = () => {
		setIsLoading(true);
		setIsSuccess(false);
		setSuccess_msg(null);
		axios.put("/api/update_status", { data: selected_students })
			.then((res) => {
				setIsLoading(false);
				setIsSuccess(true);
				setSuccess_msg("Student updated Successfully");
				setSelected_students;
			})
			.catch((err) => {
				setIsLoading(false);
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
				Students
			</h2>

			{/* Add New Studen Part */}
			<div className="mt-9 flex justify-end">
				<label
					htmlFor="my-modal-2"
					className="btn btn-outline btn-accent"
				>
					Add New Student
				</label>
				<input
					type="checkbox"
					id="my-modal-2"
					className="modal-toggle"
				/>
				<div className="modal">
					<div className="modal-box">
						<h1 className=" text-center text-lg font-bold text-violet-600 ">
							New Student Form
						</h1>
						<form
							onSubmit={handleSubmit(
								onSubmit
							)}
						>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-base text-indigo-700">
										Student
										Full Name
									</span>
								</label>
								<input
									id="student_name"
									type="text"
									placeholder="student_name"
									className="input input-accent input-bordered"
									required
									{...register(
										"student_name"
									)}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-base  text-indigo-700">
										Roll
									</span>
								</label>
								<input
									id="roll"
									type="number"
									placeholder="10"
									className="input input-accent input-bordered"
									required
									{...register(
										"roll"
									)}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-base  text-indigo-700">
										Age
									</span>
								</label>
								<input
									id="age"
									type="number"
									placeholder="10"
									className="input input-accent input-bordered"
									required
									{...register(
										"age"
									)}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-base  text-indigo-700">
										Class
									</span>
								</label>
								<input
									id="class"
									type="text"
									placeholder="10"
									className="input input-accent input-bordered"
									required
									{...register(
										"class"
									)}
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-base  text-indigo-700">
										Hall Name
									</span>
								</label>
								<input
									id="hall_name"
									type="text"
									placeholder="Nazrul"
									className="input input-accent input-bordered"
									required
									{...register(
										"hall_name"
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
								<option value="active">
									active
								</option>
								<option value="inActive">
									inActive
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

			{/* Students Part */}
			<div className="overflow-x-auto mt-10">
				{students === null ? (
					<CustomLoading />
				) : (
					<>
						{!students.length > 0 ? (
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
											No
											students
											available
											now
										</label>
									</div>
								</div>
							</div>
						) : (
							<table className="table w-full">
								<thead>
									<tr>
										<th>
											{selected_students?.length >
												0 && (
												<label
													className="btn btn-outline btn-accent"
													onClick={() =>
														update_selected_students()
													}
												>
													Update
													Selected
													Status
												</label>
											)}
										</th>
										<th>
											Student
											Name
										</th>
										<th>
											Roll
										</th>
										<th>
											Age
										</th>
										<th>
											Hall
										</th>
										<th>
											Class
										</th>
										<th>
											Status
										</th>
										<th>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{students?.map(
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
														<label>
															<input
																type="checkbox"
																className="checkbox"
																onClick={() =>
																	select_student(
																		it
																	)
																}
																checked={
																	selected_students?.find(
																		(
																			item
																		) =>
																			item.id ==
																			it._id
																	)
																		? true
																		: false
																}
															/>
														</label>
													</th>
													<td>
														{
															it.student_name
														}
													</td>
													<td>
														{
															it.roll
														}
													</td>
													<td>
														{
															it.age
														}
													</td>
													<td>
														{
															it.hall_name
														}
													</td>
													<td>
														{
															it.class
														}
													</td>
													<td>
														{
															it.status
														}
													</td>
													{/* Actions button */}
													<td className="flex items-center gap-5">
														{/* Edit */}

														<div className="  flex justify-end">
															<label
																htmlFor={`my-modal-${it._id}`}
																className="btn btn-outline btn-circle  btn-accent btn-sm"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	className="h-5 w-5"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																>
																	<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
																</svg>
															</label>
															<input
																type="checkbox"
																id={`my-modal-${it._id}`}
																className="modal-toggle"
															/>
															<div className="modal">
																<div className="modal-box">
																	<h1 className=" text-center text-lg font-bold text-violet-600 ">
																		Edit
																		Student
																	</h1>
																	<Edit_student
																		it={
																			it
																		}
																		editClick={
																			editClick
																		}
																	/>
																</div>
															</div>
														</div>
														{/* Delete */}
														<button
															className="btn btn-outline btn-circle btn-sm"
															onClick={() =>
																delete_student(
																	it._id
																)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-6 w-6"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															</svg>
														</button>
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

export default Students_page;
