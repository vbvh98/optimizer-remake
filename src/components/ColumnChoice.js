import React from "react";
import { connect } from "react-redux";
import style from "./ColumnChoice.module.css";

const ColumnChoice = ({ history, dispatch }) => {
	return (
		<div className="main">
			<div className={style.optionbox}>
				<h1>Select Number Of Columns in input Table</h1>
				<span
					onClick={() => {
						dispatch({ type: "COLUMN_COUNT_3" });
						history.push("/inputTable");
					}}>
					#3
				</span>
				<span
					onClick={() => {
						dispatch({ type: "COLUMN_COUNT_5" });
						history.push("/inputTable");
					}}>
					#5
				</span>
			</div>
		</div>
	);
};

export default connect((state, props) => {
	return { ...state, ...props };
})(ColumnChoice);
