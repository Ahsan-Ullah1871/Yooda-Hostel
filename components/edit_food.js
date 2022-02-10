import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Edit_food = ({ it, editClick }) => {
	const [food_name, setFood_name] = useState(null);
	const [food_price, setFood_price] = useState(null);
	useEffect(() => {
		setFood_name(it.food_name);
		setFood_price(it.price);
	}, [it]);

	return (
		<>
			<div className="form-control">
				<label className="label">
					<span className="label-text text-base text-indigo-700">
						Food Name
					</span>
				</label>
				<input
					value={food_name}
					id="food_name"
					type="text"
					placeholder={it.food_name}
					className="input input-accent input-bordered"
					required
					onChange={(e) =>
						setFood_name(e.target.value)
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text text-base  text-indigo-700">
						Price
					</span>
				</label>
				<input
					id="price"
					value={food_price}
					type="number"
					placeholder={it.price}
					className="input input-accent input-bordered"
					required
					onChange={(e) =>
						setFood_price(e.target.value)
					}
				/>
			</div>
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
								food_name: food_name,
								price: food_price,
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

export default Edit_food;
