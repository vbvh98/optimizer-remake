import React from "react";
import { connect } from "react-redux";
import style from "./TableData.module.css";

const TableData = ({ columnCount, history, dispatch }) => {
	const [tableData, setTableData] = React.useState("");

	const generateSubmitData = data_json => {
		let data = [];
		if (columnCount === 5)
			data_json.forEach(e => {
				for (let i = 0; i < e.Q; i++) {
					data.push({ label: e.S.trim() + "_W", length: parseInt(e.W) });
					data.push({ label: e.S.trim() + "_H", length: parseInt(e.H) });
				}
			});
		else
			data_json.forEach(e => {
				for (let i = 0; i < e.Q; i++) {
					data.push({ label: e.S.trim() + "_W", length: parseInt(e.W) });
				}
			});
		return data;
	};

	const generateTableJson = data => {
		const rows = data.trim().split("\n");
		const fields = columnCount === 3 ? ["S", "W", "Q"] : ["S", "W", "Q", "H", "Q"];
		let data_json = [];
		for (let y = 1; y < rows.length; y++) {
			const cells = rows[y].split("\t");
			if (fields) data_json.push(Object.assign(...fields.map((k, i) => ({ [k]: cells[i] }))));
		}

		return generateSubmitData(data_json);
	};

	const handleNext = () => {
		if (tableData && tableData !== {}) {
			dispatch({ type: "SET_TABLE_DATA", payload: generateTableJson(tableData) });
			history.push("/profileLength");
		} else {
			alert("Paste Table Data From Excel");
		}
	};

	return (
		<div className="main">
			<div className={style.textareawrapper}>
				<h1 style={{ textTransform: "uppercase" }}>Enter table data</h1>
				<textarea
					style={{ width: "80%" }}
					cols="80"
					rows="25"
					value={tableData}
					onChange={e => {
						setTableData(e.target.value);
					}}
					placeholder={`Column Format: Sno Width Qty ${
						columnCount === 5 ? "height Qty" : ""
					}`}
				/>
				<button className={style.button} onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	);
};

export default connect((state, props) => ({
	...state,
	...props
}))(TableData);
