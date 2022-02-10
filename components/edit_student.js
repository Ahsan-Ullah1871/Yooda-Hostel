import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Edit_student = ({ it, editClick }) => {
	const [student_name, setStudent_name] = useState(null);
	const [roll, setRoll] = useState(null);
	const [age, setAge] = useState(null);
	const [class_name, setClass_name] = useState(null);
	const [hall, setHall] = useState(null);
	const [status, setStatus] = useState(null);
	useEffect(() => {
		setStudent_name(it.student_name);
		setRoll(it.roll);
		setAge(it.age);
		setClass_name(it.class);
		setHall(it.hall_name);
		setStatus(it.status);
	}, [it]);

	return (
		<>
			<div className="form-control">
				<label className="label">
					<span className="label-text text-base text-indigo-700">
						Student Full Name
					</span>
				</label>
				<input
					id="student_name"
					type="text"
					placeholder="student_name"
					className="input input-accent input-bordered"
					required
					value={student_name}
					onChange={(e) =>
						setStudent_name(e.target.value)
					}
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
					value={roll}
					onChange={(e) => setRoll(e.target.value)}
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
					value={age}
					onChange={(e) => setAge(e.target.value)}
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
					value={class_name}
					onChange={(e) =>
						setClass_name(e.target.value)
					}
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
					value={hall}
					onChange={(e) => setHall(e.target.value)}
				/>
			</div>
			<select
				className="select select-bordered select-primary w-full max-w-xs mt-5"
				onChange={(e) => setStatus(e.target.value)}
				required
			>
				<option disabled="disabled" selected="selected">
					Status
				</option>
				<option
					value="active"
					selected={it.status == "active" && true}
				>
					active
				</option>
				<option
					value="inActive"
					selected={it.status == "inActive" && true}
				>
					inActive
				</option>
			</select>

			<div className="modal-action">
				<label
					htmlFor={`my-modal-${it._id}`}
					className="btn btn-warning"
				>
					Cancel
				</label>
				<button
					htmlFor=" my-modal-3"
					className="btn  btn-outline btn-primary px-4"
					type="submit"
					onClick={() =>
						editClick(
							{
								student_name:
									student_name,
								roll: roll,
								age: age,
								class: class_name,
								hall_name: hall,
								status: status,
							},
							it._id
						)
					}
				>
					Edit Item
				</button>
			</div>
		</>
	);
};

export default Edit_student;
