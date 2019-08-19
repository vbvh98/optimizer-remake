import React from "react";
import style from "./Result.module.css";
import greedy_solution from "../utils/greedy";
import { connect } from "react-redux";

const Result = ({ history, tableData, profileLength, dispatch, ...rest }) => {
	const [result, setResult] = React.useState([]);
	const tableRef = React.useRef(0);

	const downloadTable = () => {
		let downloadLink;
		const dataType = "application/vnd.ms-excel";
		const tableSelect = tableRef.current;
		let tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

		// Specify file name
		const filename = prompt("Enter File name: ") + ".xls";
		if (filename === "null.xls") return;

		// Create download link element
		downloadLink = document.createElement("a");

		document.body.appendChild(downloadLink);

		if (navigator.msSaveOrOpenBlob) {
			const blob = new Blob(["\ufeff", tableHTML], {
				type: dataType
			});
			navigator.msSaveOrOpenBlob(blob, filename);
		} else {
			// Create a link to the file
			downloadLink.href = "data:" + dataType + ", " + tableHTML;

			// Setting the file name
			downloadLink.download = filename;

			//triggering the function
			downloadLink.click();
		}
	};

	React.useEffect(() => {
		const solution = greedy_solution(tableData, profileLength).map(e =>
			JSON.stringify({ items: e.items, unused: e.space_remaning })
		);
		let counter = {};
		solution.forEach(row => {
			if (counter.hasOwnProperty(row)) counter[row] += 1;
			else counter[row] = 1;
		});
		let final = [];
		for (let i in counter) {
			const { items, unused } = JSON.parse(i);
			final.push({
				items,
				unused,
				count: counter[i]
			});
		}
		setResult(final.sort((a, b) => b.count - a.count));
	}, [profileLength, tableData]);

	if (JSON.stringify(result) === JSON.stringify([{ items: [], unused: 0, count: 1 }]))
		return (
			<div className="main">
				<div className={style.resultbox}>
					<h1>NO RESULT</h1>
					<button
						onClick={() => {
							history.push("/");
						}}>
						Reset
					</button>
				</div>
			</div>
		);

	return (
		<div className="main">
			<div className={style.resultbox}>
				<div className={style.tablediv}>
					<table ref={tableRef} cellSpacing="0" border="1">
						<thead>
							<tr>
								<td>PIECES TO CUT</td>
								<td>NUMBER OF PROFILES</td>
								<td>WASTE</td>
							</tr>
						</thead>
						<tbody>
							{result.map(profile => (
								<tr key={JSON.stringify(profile)}>
									<td className={style.profile}>
										<table cellSpacing="0" cellPadding="4">
											<tbody>
												<tr>
													{profile.items.map((i, j) => (
														<td
															key={j}
															style={{
																borderLeft: "1px solid black",
																width: `${(i.length * 100) /
																	profileLength}%`
															}}>
															<strong>{i.label}</strong> {i.length}
														</td>
													))}
												</tr>
											</tbody>
										</table>
									</td>
									<td>{profile.count}</td>
									<td>{profile.unused}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className={style.buttons}>
					<button
						onClick={() => {
                            dispatch({type: "RESET_TABLE_DATA"})
                            dispatch({type: "RESET_LENGTH"})
							history.push("/");
						}}>
						Reset
					</button>
					<button onClick={downloadTable}>Download</button>
				</div>
			</div>
		</div>
	);
};

export default connect((state, props) => ({
	...state,
	...props
}))(Result);
